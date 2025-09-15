// app/[lang]/MicroTerminal.tsx
// Single-tab terminal for chat/completions that replays on an interval.
// Fixes included:
// - Memoize startKeyAnimation with useCallback and add to effect deps (react-hooks/exhaustive-deps).
// - Remove unused state value by ignoring idx and only using its setter.
// - Keep the full visual and typing behavior intact.

'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }
type Dialog = ChatMessage[]

const CHAT_PATH = '/v1/chat/completions'

// Laptop-friendly open models
const MODELS = [
  'Llama-3.1-8B-Instruct',
  'Mixtral-8x7B-Instruct',
  'Mistral-7B-Instruct-v0.2',
  'OpenChat-3.6',
  'Zephyr-7B-Beta',
  'Qwen2.5-14B-Instruct'
]

// Ten dialogs
const DIALOGS: Dialog[] = [
  [{ role: 'user', content: 'How do I cook pasta in a rice cooker?' }],
  [
    { role: 'system', content: 'You are a concise assistant.' },
    { role: 'user', content: 'Give me 3 quick tips to speed up Node.js APIs.' }
  ],
  [
    { role: 'user', content: 'Summarize the pros and cons of RAG vs fine-tuning in 5 bullets.' },
    { role: 'assistant', content: 'RAG pros: fresh info, smaller base model... cons: retrieval infra...' },
    { role: 'user', content: 'Now add one concrete example for each approach.' }
  ],
  [
    { role: 'system', content: 'Answer with bullet points only.' },
    { role: 'user', content: 'Keep it framework-agnostic.' }
  ],
  [{ role: 'user', content: 'Explain how JSON Web Tokens work to a junior developer.' }],
  [
    { role: 'system', content: 'Always include a short code example when relevant.' },
    { role: 'user', content: 'How do I debounce a function in JavaScript?' }
  ],
  [
    { role: 'user', content: 'What is the difference between Docker image and container?' },
    { role: 'assistant', content: 'An image is a template; a container is a running instance.' },
    { role: 'user', content: 'List typical commands to inspect a running container.' }
  ],
  [{ role: 'user', content: 'Give me a regex to validate ISO8601 date (YYYY-MM-DD) and explain it.' }],
  [
    { role: 'system', content: 'Be strictly accurate and prefer standards references.' },
    { role: 'user', content: 'What is the correct HTTP status code for a validation error?' }
  ],
  [{ role: 'user', content: 'I have an array of 10M integers. Outline approaches to get the 100 largest values quickly.' }]
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

// Constants
const KEY_PLACEHOLDER = '**rk-▓▓▓▓▓▓▓▓-▓▓▓▓▓▓▓▓**'
const CYCLE_MS = 10000
const CHARS_PER_FRAME = 5

export default function MicroTerminal() {
  // We only need the setter to drive the animation; ignore the state value to avoid "unused var"
  const [, setIdx] = useState(0)

  // Typewriter state
  const [frameText, setFrameText] = useState('')
  const [methodLine, setMethodLine] = useState('')
  const [headerText, setHeaderText] = useState('')
  const [bodyText, setBodyText] = useState('')

  // Key animation state
  const [keyAnimValue, setKeyAnimValue] = useState('rk-▓▓▓▓▓▓▓▓-▓▓▓▓▓▓▓▓')
  const [finalKey, setFinalKey] = useState('rk-▓▓▓▓▓▓▓▓-▓▓▓▓▓▓▓▓')

  // Control refs (do not break hooks deps)
  const animTokenRef = useRef(0)
  const keyStartedRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const busyRef = useRef(false)

  // Build initial frame and recycle on interval if not busy
  useEffect(() => {
    buildFrame()
    const id = window.setInterval(() => {
      if (!busyRef.current) buildFrame()
    }, CYCLE_MS)
    return () => clearInterval(id)
    // buildFrame is intentionally not in deps; it does not capture stale values we care about
  }, [])

  // Build a new chat/completions request with random model and dialog
  function buildFrame() {
    const model = pick(MODELS)
    const dialog = pick(DIALOGS)
    const body = { model, messages: dialog }
    const bodyJson = JSON.stringify(body, null, 2)

    const full = [
      `POST **https://api.rtity.cloud${CHAT_PATH}**`,
      'Headers:',
      `  Authorization: Bearer ${KEY_PLACEHOLDER}`,
      '  Content-Type: application/json',
      '',
      'Body:',
      bodyJson
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
  }

  // Memoized key flashing to satisfy exhaustive-deps
  const startKeyAnimation = useCallback((flashes = 12, intervalMs = 60) => {
    if (keyStartedRef.current) return
    keyStartedRef.current = true

    const token = ++animTokenRef.current
    let i = 0
    const intervalId = window.setInterval(() => {
      if (token !== animTokenRef.current) {
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
  }, [finalKey])

  // Typewriter with early key flashing
  useEffect(() => {
    if (!frameText) return

    const step = () => {
      setIdx(prev => {
        const next = Math.min(prev + CHARS_PER_FRAME, frameText.length)
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
    }
  }, [frameText, startKeyAnimation])

  // Render helpers
  const renderedMethod = useMemo(
    () => ({ __html: methodLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }),
    [methodLine]
  )

  const renderedHeader = useMemo(() => {
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const html = esc(headerText)
      .replace(/(^|\n)Headers:/, '$1<strong>Headers:</strong>')
      .replace(/\*\*rk-▓▓▓▓▓▓▓▓-▓▓▓▓▓▓▓▓\*\*/g, `<strong>${keyAnimValue}</strong>`)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    return { __html: html }
  }, [headerText, keyAnimValue])

  const renderedBody = useMemo(() => {
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const html = esc(bodyText)
      .replace(/"([^"]+)"(?=\s*:)/g, '<span class="j-key">"$1"</span>')
      .replace(/:\s*"([^"]*)"/g, ': <span class="j-str">"$1"</span>')
      .replace(/\b(true|false|null)\b/g, '<span class="j-bool">$1</span>')
      .replace(/:\s*(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g, ': <span class="j-num">$1</span>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    return { __html: html }
  }, [bodyText])

  return (
    <div className="terminal-wrapper">
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
        /* Rounded terminal body only (no header bar, no dots) */
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

          /* Keep blend effects isolated */
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
          background-size:
            100% 2px,
            100% 100%,
            4px 4px;
          mix-blend-mode: screen;
          opacity: 0.05;
          animation: crtFlicker 1.8s infinite;
          z-index: 1;
          filter: blur(0.25px);
          transform: perspective(1000px) rotateX(0.5deg);
          border-radius: inherit;
        }

        @supports (-webkit-touch-callout: none) {
          .terminal-wrapper::after { mix-blend-mode: normal; opacity: 0.08; }
        }

        @keyframes crtFlicker {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.28; }
        }

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
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(
            to bottom,
            rgba(11, 11, 11, 0) 0%,
            rgba(11, 11, 11, 0.9) 80%,
            rgba(11, 11, 11, 1) 100%
          );
          pointer-events: none;
        }

        .terminal-command { color: #f9a729; font-weight: bold; }
        .terminal-headers, .terminal-body-label, .json-view {
          color: #f4f4f4;
          font-family: 'IBM Plex Mono', 'Courier New', monospace !important;
          position: relative;
          z-index: 2;
        }
        .terminal-body-label { font-weight: 700; }

        /* JSON highlighting */
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
