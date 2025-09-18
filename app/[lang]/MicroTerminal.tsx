// app/[lang]/MicroTerminal.tsx
// Single-tab terminal for chat/completions with throttled typing and offscreen pause.
// Performance upgrades (kept visuals and behavior):
// - Throttled requestAnimationFrame to maxFPS (default 30) to reduce reflows.
// - IntersectionObserver to pause when component is offscreen.
// - Respects prefers-reduced-motion: lowers FPS and chars/sec, disables flicker boost.
// - Memoized buildFrame/startKeyAnimation; cleaned effect deps.
// - Precompiled regexes; minimized string work per tick.
// - Guarded timers/RAF against stale tokens to avoid ghost work.

'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }
type Dialog = ChatMessage[]

type MicroTerminalProps = {
  maxFPS?: number
  charsPerSecond?: number
  suspendWhenOffscreen?: boolean
}

const CHAT_PATH = '/v1/chat/completions'
const MODELS = [
  'Llama-3.1-8B-Instruct',
  'Mixtral-8x7B-Instruct',
  'Mistral-7B-Instruct-v0.2',
  'OpenChat-3.6',
  'Zephyr-7B-Beta',
  'Qwen2.5-14B-Instruct',
]

// Ten dialogs (same semantics as before)
const DIALOGS: Dialog[] = [
  [{ role: 'user', content: 'How do I cook pasta in a rice cooker?' }],
  [
    { role: 'system', content: 'You are a concise assistant.' },
    { role: 'user', content: 'Give me 3 quick tips to speed up Node.js APIs.' },
  ],
  [
    { role: 'user', content: 'Summarize the pros and cons of RAG vs fine-tuning in 5 bullets.' },
    { role: 'assistant', content: 'RAG pros: fresh info, smaller base model... cons: retrieval infra...' },
    { role: 'user', content: 'Now add one concrete example for each approach.' },
  ],
  [
    { role: 'system', content: 'Answer with bullet points only.' },
    { role: 'user', content: 'Keep it framework-agnostic.' },
  ],
  [{ role: 'user', content: 'Explain how JSON Web Tokens work to a junior developer.' }],
  [
    { role: 'system', content: 'Always include a short code example when relevant.' },
    { role: 'user', content: 'How do I debounce a function in JavaScript?' },
  ],
  [
    { role: 'user', content: 'What is the difference between Docker image and container?' },
    { role: 'assistant', content: 'An image is a template; a container is a running instance.' },
    { role: 'user', content: 'List typical commands to inspect a running container.' },
  ],
  [{ role: 'user', content: 'Give me a regex to validate ISO8601 date (YYYY-MM-DD) and explain it.' }],
  [
    { role: 'system', content: 'Be strictly accurate and prefer standards references.' },
    { role: 'user', content: 'What is the correct HTTP status code for a validation error?' },
  ],
  [{ role: 'user', content: 'I have an array of 10M integers. Outline approaches to get the 100 largest values quickly.' }],
]

// Helpers
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
function generateKeyTail(length = 8): string {
  const chars = 'abcdef1234567890'
  let key = ''
  for (let i = 0; i < length; i++) key += chars.charAt(Math.floor(Math.random() * chars.length))
  return key
}

// Static tokens and timings
const KEY_PLACEHOLDER = '**rk-▓▓▓▓▓▓▓▓-▓▓▓▓▓▓▓▓**'
const CYCLE_MS = 10000

// Precompiled regexes for highlighting
const RX_BOLD = /\*\*(.*?)\*\*/g
const RX_JSON_KEY = /"([^"]+)"(?=\s*:)/g
const RX_JSON_STR = /:\s*"([^"]*)"/g
const RX_JSON_BOOL = /\b(true|false|null)\b/g
const RX_JSON_NUM = /:\s*(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g

export default function MicroTerminal({
  maxFPS,
  charsPerSecond,
  suspendWhenOffscreen = true,
}: MicroTerminalProps) {
  // Adaptive motion based on user preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const effectiveMaxFPS = Math.max(10, (prefersReducedMotion ? 20 : (maxFPS ?? 30)))
  const effectiveCharsPerSec = Math.max(1, (prefersReducedMotion ? 20 : (charsPerSecond ?? 60)))

  // We only need the setter to advance the typewriter cursor
  const [, setIdx] = useState(0)

  // Typewriter state
  const [frameText, setFrameText] = useState('')
  const [methodLine, setMethodLine] = useState('')
  const [headerText, setHeaderText] = useState('')
  const [bodyText, setBodyText] = useState('')

  // Key animation state
  const [keyAnimValue, setKeyAnimValue] = useState('rk-▓▓▓▓▓▓▓▓-▓▓▓▓▓▓▓▓')
  const [finalKey, setFinalKey] = useState('rk-▓▓▓▓▓▓▓▓-▓▓▓▓▓▓▓▓')

  // Control refs
  const animTokenRef = useRef(0)
  const keyStartedRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const busyRef = useRef(false)
  const mountedRef = useRef(false)
  const activeRef = useRef(true) // toggled by IntersectionObserver
  const tickAccumRef = useRef(0) // for FPS throttle
  const lastTsRef = useRef<number | null>(null)

  // Build a new frame (memoized)
  const buildFrame = useCallback(() => {
    const model = pick(MODELS)
    const dialog = pick(DIALOGS)
    const body = { model, messages: dialog }
    const bodyJson = JSON.stringify(body, null, 2)

    const full = [
      `POST **https://api.rtity.cloud** ${CHAT_PATH}`,
      'Headers:',
      `  Authorization: Bearer ${KEY_PLACEHOLDER}`,
      '  Content-Type: application/json',
      '',
      'Body:',
      bodyJson,
    ].join('\n')

    animTokenRef.current += 1
    keyStartedRef.current = false
    setFinalKey(`rk-${generateKeyTail()}-${generateKeyTail()}`)
    setKeyAnimValue('rk-▓▓▓▓▓▓▓▓-▓▓▓▓▓▓▓▓')

    setFrameText(full)
    setIdx(0)
    setMethodLine('')
    setHeaderText('')
    setBodyText('')
    busyRef.current = true
  }, [])

  // Key flashing (memoized)
  const startKeyAnimation = useCallback(
    (flashes = prefersReducedMotion ? 6 : 12, intervalMs = prefersReducedMotion ? 90 : 60) => {
      if (keyStartedRef.current) return
      keyStartedRef.current = true

      const token = ++animTokenRef.current
      let i = 0
      const intervalId = window.setInterval(() => {
        if (token !== animTokenRef.current || !mountedRef.current) {
          window.clearInterval(intervalId)
          return
        }
        setKeyAnimValue(`rk-${generateKeyTail()}-${generateKeyTail()}`)
        i++
        if (i >= flashes) {
          window.clearInterval(intervalId)
          setKeyAnimValue(finalKey)
          busyRef.current = false
        }
      }, intervalMs)
    },
    [finalKey, prefersReducedMotion]
  )

  // Initial build + recycle
  useEffect(() => {
    mountedRef.current = true
    buildFrame()
    const id = window.setInterval(() => {
      if (!busyRef.current) buildFrame()
    }, CYCLE_MS)
    return () => {
      mountedRef.current = false
      clearInterval(id)
    }
  }, [buildFrame])

  // Offscreen suspension to save CPU/GPU
  const rootRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!suspendWhenOffscreen || !rootRef.current) return
    const el = rootRef.current
    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        activeRef.current = !!e?.isIntersecting
      },
      { root: null, threshold: 0.01 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [suspendWhenOffscreen])

  // Typewriter loop with FPS throttle
  useEffect(() => {
    if (!frameText) return

    const charsPerTick = Math.max(1, Math.round(effectiveCharsPerSec / effectiveMaxFPS))
    const minFrameMs = 1000 / effectiveMaxFPS

    const step = (ts: number) => {
      if (!activeRef.current) {
        // Skip updates while offscreen but keep RAF alive cheaply
        rafRef.current = requestAnimationFrame(step)
        return
      }

      if (lastTsRef.current == null) lastTsRef.current = ts
      const dt = ts - lastTsRef.current
      lastTsRef.current = ts

      tickAccumRef.current += dt
      if (tickAccumRef.current < minFrameMs) {
        rafRef.current = requestAnimationFrame(step)
        return
      }
      tickAccumRef.current = 0

      setIdx((prev) => {
        const next = Math.min(prev + charsPerTick, frameText.length)
        const slice = frameText.slice(0, next)

        // Split method/headers/body progressively
        const firstNL = slice.indexOf('\n')
        if (firstNL >= 0) {
          setMethodLine(slice.slice(0, firstNL))
          const afterFirst = slice.slice(firstNL + 1)
          const marker = '\nBody:\n'
          const mPos = afterFirst.indexOf(marker)
          if (mPos >= 0) {
            setHeaderText(afterFirst.slice(0, mPos))
            setBodyText(afterFirst.slice(mPos + marker.length))
          } else {
            setHeaderText(afterFirst)
            setBodyText('')
          }
        } else {
          setMethodLine(slice)
          setHeaderText('')
          setBodyText('')
        }

        // Trigger key animation at auth line or at the end if not yet started
        if (!keyStartedRef.current && slice.includes(`Authorization: Bearer ${KEY_PLACEHOLDER}`)) {
          startKeyAnimation()
        }
        if (next >= frameText.length && !keyStartedRef.current) {
          startKeyAnimation()
        }

        return next
      })

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      lastTsRef.current = null
      tickAccumRef.current = 0
    }
  }, [frameText, effectiveCharsPerSec, effectiveMaxFPS, startKeyAnimation])

  // Render helpers (minimized per-tick work; regexes precompiled)
  const renderedMethod = useMemo(
    () => ({ __html: methodLine.replace(RX_BOLD, '<strong>$1</strong>') }),
    [methodLine]
  )

  const renderedHeader = useMemo(() => {
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const html = esc(headerText)
      .replace(/(^|\n)Headers:/, '$1<strong>Headers:</strong>')
      .replace(/\*\*rk-▓▓▓▓▓▓▓▓-▓▓▓▓▓▓▓▓\*\*/g, `<strong>${keyAnimValue}</strong>`)
      .replace(RX_BOLD, '<strong>$1</strong>')
    return { __html: html }
  }, [headerText, keyAnimValue])

  const renderedBody = useMemo(() => {
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const html = esc(bodyText)
      .replace(RX_JSON_KEY, '<span class="j-key">"$1"</span>')
      .replace(RX_JSON_STR, ': <span class="j-str">"$1"</span>')
      .replace(RX_JSON_BOOL, '<span class="j-bool">$1</span>')
      .replace(RX_JSON_NUM, ': <span class="j-num">$1</span>')
      .replace(RX_BOLD, '<strong>$1</strong>')
    return { __html: html }
  }, [bodyText])

  return (
    <div ref={rootRef} className="terminal-wrapper">
      <pre className="terminal-content">
        <span className="terminal-command" dangerouslySetInnerHTML={renderedMethod} />
        {'\n'}
        <span className="terminal-headers" dangerouslySetInnerHTML={renderedHeader} />
        {''}
        <span className="terminal-body-label"><strong>Body:</strong></span>
        {'\n'}
        <code className="json-view" dangerouslySetInnerHTML={renderedBody} />
      </pre>

      <style jsx>{`
        .terminal-wrapper {
          background: #0b0b0b;
          border-radius: 24px;
          color: #f9a729;
          font-family: 'IBM Plex Mono', 'Courier New', monospace !important;
          font-size: 1rem;
          line-height: 1.6;
          box-shadow: 0 0 0 2px #0008, 0 0 24px #f9a72933;
          border: 3px solid #f9a72933;
          position: relative;
          z-index: 0;
          height: 320px;
          isolation: isolate;
          background-clip: padding-box;
        }
        .terminal-wrapper::before {
          content: "";
          position: absolute;
          inset: 20px;
          border-radius: inherit;
          background: #f9a72933;
          filter: blur(40px);
          opacity: 0.15;
          z-index: -1;
        }
        .terminal-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            repeating-linear-gradient(
              rgba(0, 0, 0, 0.54) 0px,
              rgba(0, 0, 0, 0.94) 1px,
              transparent 1px,
              transparent 2px
            ),
            radial-gradient(circle at center, rgba(255,255,255,0.215) 0%, transparent 80%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 2 2' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.4' fill='white' /%3E%3C/svg%3E");
          background-size: 100% 2px, 100% 100%, 4px 4px;
          mix-blend-mode: screen;
          opacity: 0.05;
          animation: crtFlicker 1.8s ${prefersReducedMotion ? 'paused' : 'infinite'};
          z-index: 1;
          filter: blur(0.25px);
          transform: perspective(1000px) rotateX(0.5deg);
          border-radius: inherit;
        }
        @keyframes crtFlicker { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.28; } }

        .terminal-content {
          background: rgba(0,0,0,1);
          position: relative;
          padding: 18px;
          height: 320px;
          overflow: hidden;
          white-space: pre-wrap;
          text-shadow: 0 0 4px #f9a72933, 0 0 1px #f9a729;
          border-radius: inherit;

          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%);
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-size: 100% 100%;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%);
          mask-repeat: no-repeat;
          mask-size: 100% 100%;
        }
        .terminal-content::after {
          content: "";
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 80px;
          background: linear-gradient(to bottom, rgba(11,11,11,0) 0%, rgba(11,11,11,0.9) 80%, rgba(11,11,11,1) 100%);
          pointer-events: none;
        }

        .terminal-command { color: #f9a729; font-weight: bold; }
        .terminal-headers, .terminal-body-label, .json-view {
          color: #f4f4f4;
          font-family: 'IBM Plex Mono', 'Courier New', monospace !important;
          position: relative; z-index: 2;
        }
        .terminal-body-label { font-weight: 700; }

        .json-view :global(.j-key) { color: #f9a729; font-weight: 600; }
        .json-view :global(.j-str) { color: #ffffff; }
        .json-view :global(.j-bool) { color: #ffd27a; }
        .json-view :global(.j-num) { color: #ffd27a; }

        @media (max-width: 768px) {
          .terminal-wrapper { min-height: 300px; font-size: 1rem; }
          .terminal-content { padding: 14px; min-height: 300px; }
        }
      `}</style>
    </div>
  )
}
