// app/[lang]/cloud/MultiTerminalLight.tsx
// Single-tab terminal that types a localized HTTP request and flashes an API key.
// ESLint fixes:
// - Remove unused state value by ignoring it: const [, setIdx] = useState(0)
// - Memoize buildFrame and startKeyAnimation with useCallback
// - Add them to respective useEffect dependency arrays

'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '@/components/locale'
import dicts from './locale'

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }
type Dialog = ChatMessage[]

// Static constants
const CHAT_PATH = '/v1/chat/completions'
const KEY_PLACEHOLDER = '**rk-▓▓▓▓▓▓▓▓-▓▓▓▓▓▓▓▓**'
const CYCLE_MS = 10000
const CHARS_PER_FRAME = 2

// Laptop-friendly open models
const MODELS = [
  'Llama-3.1-8B-Instruct',
  'Mixtral-8x7B-Instruct',
  'Mistral-7B-Instruct-v0.2',
  'OpenChat-3.6',
  'Zephyr-7B-Beta',
  'Qwen2.5-14B-Instruct',
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

type Dict = typeof dicts.en

export default function MultiTerminalLight() {
  const lang = useLang()
  const t: Dict = (dicts as Record<string, Dict>)[lang] ?? dicts.en

  // Localized, memoized resources
  const DIALOGS: Dialog[] = useMemo(() => t.terminalLight.dialogs as Dialog[], [t])
  const LABEL_HEADERS: string = useMemo(() => t.terminalLight.labels.headers, [t])
  const LABEL_BODY: string = useMemo(() => t.terminalLight.labels.body, [t])

  // We only need the setter to drive typing; ignore value to avoid "unused var"
  const [, setIdx] = useState(0)

  // Typewriter slices
  const [frameText, setFrameText] = useState('')
  const [methodLine, setMethodLine] = useState('')
  const [headerText, setHeaderText] = useState('')
  const [bodyText, setBodyText] = useState('')

  // Key animation
  const [keyAnimValue, setKeyAnimValue] = useState('rk-▓▓▓▓▓▓▓▓-▓▓▓▓▓▓▓▓')
  const [finalKey, setFinalKey] = useState('rk-▓▓▓▓▓▓▓▓-▓▓▓▓▓▓▓▓')

  // Control refs
  const animTokenRef = useRef(0)
  const keyStartedRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const busyRef = useRef(false)

  // Build a new frame (memoized to satisfy exhaustive-deps)
  const buildFrame = useCallback(() => {
    const model = pick(MODELS)
    const dialog = pick(DIALOGS)
    const body = { model, messages: dialog }
    const bodyJson = JSON.stringify(body, null, 2)

    const full = [
      `POST **https://api.rtity.cloud** ${CHAT_PATH}`,
      LABEL_HEADERS,
      `  Authorization: Bearer ${KEY_PLACEHOLDER}`,
      '  Content-Type: application/json',
      '',
      `${LABEL_BODY}`,
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
  }, [DIALOGS, LABEL_BODY, LABEL_HEADERS])

  // Start key flashing (memoized)
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

  // Initial build + recycle
  useEffect(() => {
    buildFrame()
    const id = window.setInterval(() => {
      if (!busyRef.current) buildFrame()
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [buildFrame])

  // Typewriter loop
  useEffect(() => {
    if (!frameText) return

    const step = () => {
      setIdx(prev => {
        const next = Math.min(prev + CHARS_PER_FRAME, frameText.length)
        const slice = frameText.slice(0, next)

        const firstNL = slice.indexOf('\n')
        if (firstNL >= 0) {
          setMethodLine(slice.slice(0, firstNL))
          const afterFirst = slice.slice(firstNL + 1)
          const marker = `\n${LABEL_BODY}\n`
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
  }, [frameText, LABEL_BODY, startKeyAnimation])

  // Render helpers
  const renderedMethod = useMemo(
    () => ({ __html: methodLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }),
    [methodLine]
  )

  const renderedHeader = useMemo(() => {
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const safeHeaderLabel = LABEL_HEADERS.replace(':', '\\:')
    const html = esc(headerText)
      .replace(new RegExp(`(^|\\n)${safeHeaderLabel}`), `$1<strong>${LABEL_HEADERS}</strong>`)
      .replace(/\*\*rk-▓▓▓▓▓▓▓▓-▓▓▓▓▓▓▓▓\*\*/g, `<strong>${keyAnimValue}</strong>`)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    return { __html: html }
  }, [headerText, keyAnimValue, LABEL_HEADERS])

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
      <div className="terminal-header">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
      </div>

      <pre className="terminal-content">
        <span className="terminal-command" dangerouslySetInnerHTML={renderedMethod} />
        {'\n'}
        <span className="terminal-headers" dangerouslySetInnerHTML={renderedHeader} />
        {''}
        <span className="terminal-body-label"><strong>{LABEL_BODY}</strong></span>
        {'\n'}
        <code className="json-view" dangerouslySetInnerHTML={renderedBody} />
      </pre>

      <style jsx>{`
        .terminal-wrapper {
          background: #0b0b0b;
          border-radius: 12px;
          color: #f9a729;
          font-family: 'IBM Plex Mono', 'Courier New', monospace !important;
          font-size: 1rem;
          line-height: 1.6;
          box-shadow: 0 0 0 2px #0008, 0 0 24px #f9a72933;
          border: 3px solid #f9a72933;
          position: relative;
          z-index: 0;
          height: 500px;
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
          animation: crtFlicker 1.8s infinite;
          z-index: 1;
          filter: blur(0.25px);
          transform: perspective(1000px) rotateX(0.5deg);
        }

        @supports (-webkit-touch-callout: none) {
          .terminal-wrapper::after { mix-blend-mode: normal; opacity: 0.08; }
        }

        @keyframes crtFlicker { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.28; } }

        .terminal-header { display: flex; gap: 8px; padding: 8px 12px; background: #2a2a2a; }
        .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
        .dot.red { background-color: #000000; }
        .dot.yellow { background-color: #f9a729; }
        .dot.green { background-color: #ffffff; }

        .terminal-content {
          background: rgba(0,0,0,1) 40%;
          position: relative;
          padding: 12px;
          height: 500px;
          overflow: hidden;
          white-space: pre-wrap;
          text-shadow: 0 0 4px #f9a72933, 0 0 1px #f9a729;
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
        .json-view :global(.j-str), .json-view :global(.j-bool), .json-view :global(.j-num) { color: #ffd27a; }
        .json-view :global(.j-str) { color: #ffffff; }

        @media (max-width: 768px) {
          .terminal-wrapper { min-height: 300px; font-size: 1rem; }
          .terminal-content { padding: 16px; min-height: 450px; }
        }
      `}</style>
    </div>
  )
}
