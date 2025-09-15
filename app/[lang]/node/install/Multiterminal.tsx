// app/[lang]/node/install/Multiterminal.tsx
// Fix: remove unused variable, add proper types, clear timers on unmount.

"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/locale";
import dicts from "./locale";

// infer types from locale
type Dict = typeof dicts.en;
type TerminalStep = Dict["terminal"]["steps"][number];

export default function Multiterminal() {
  const lang = useLang();
  const t: Dict = (dicts as Record<string, Dict>)[lang] ?? dicts.en;
  const steps: TerminalStep[] = t.terminal.steps;

  const [stepIndex, setStepIndex] = useState(0);
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [displayedOutput, setDisplayedOutput] = useState("");

  useEffect(() => {
    let mounted = true;
    let frame = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let index = 0;

    const delayBetweenSteps = 6000;
    const delayAfterFinal = 14000;
    const charsPerFrame = 2;

    const step = steps[stepIndex];
    const command = `${step?.name ?? ""} ▓`;
    const output = (step?.text ?? "").trim();
    const fullText = `${command}\n${output}`;
    index = 0;

    const render = () => {
      if (!mounted) return;
      const nextIndex = Math.min(index + charsPerFrame, fullText.length);
      const slice = fullText.slice(0, nextIndex);
      index = nextIndex;

      const split = slice.indexOf("\n");
      if (split >= 0) {
        setDisplayedCommand(slice.slice(0, split));
        setDisplayedOutput(slice.slice(split + 1));
      } else {
        setDisplayedCommand(slice);
        setDisplayedOutput("");
      }

      if (index < fullText.length) {
        frame = requestAnimationFrame(render);
      } else {
        const isFinal = stepIndex === steps.length - 1;
        const delay = isFinal ? delayAfterFinal : delayBetweenSteps;
        timeoutId = setTimeout(() => {
          if (!mounted) return;
          setDisplayedCommand("");
          setDisplayedOutput("");
          setStepIndex((prev) => (prev + 1) % steps.length);
        }, delay);
      }
    };

    frame = requestAnimationFrame(render);

    return () => {
      mounted = false;
      if (frame) cancelAnimationFrame(frame);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [stepIndex, steps]);

  return (
    <div className="terminal-wrapper">
      <div className="terminal-header">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
      </div>

      <div className="terminal-buttons">
        <p>~/rtity-node </p>
        {steps.map((line: TerminalStep, i: number) => (
          <button
            key={i}
            className={`terminal-button ${i === stepIndex ? "active" : ""}`}
            onClick={() => {
              setDisplayedCommand("");
              setDisplayedOutput("");
              setStepIndex(i);
            }}
          >
            {line.name}
          </button>
        ))}
      </div>

      <pre className="terminal-content">
        <span className="terminal-command">~/rtity-node {displayedCommand}</span>
        {displayedOutput && (
          <>
            {"\n"}
            <span className="terminal-output">{displayedOutput}</span>
          </>
        )}
      </pre>

      <style jsx>{`
        .terminal-wrapper {
          background: #111;
          border-radius: 8px;
          color: #f9a729;
          font-family: 'IBM Plex Mono', 'Courier New', monospace !important;
          font-size: 1.4rem;
          line-height: 1.6;
          overflow: hidden;
          box-shadow: 0 0 0 2px #0008, 0 0 24px #f9a72933;
          border: 1px solid #222;
          position: relative;
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
        @keyframes crtFlicker {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.28; }
        }
        .terminal-header {
          display: flex;
          gap: 8px;
          padding: 8px 12px;
          background: #2a2a2a;
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
        .dot.red { background-color: #000000; }
        .dot.yellow { background-color: #f9a729; }
        .dot.green { background-color: #ffffff; }
        .terminal-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 12px 24px;
          background: #1a1a1a;
        }
        .terminal-button {
          background: #222;
          color: #f9a729;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 1rem;
          border: 1px solid #333;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .terminal-button:hover { background: #333; }
        .terminal-button.active { background: #f9a729; color: #111; font-weight: bold; }
        .terminal-content {
          padding: 24px;
          white-space: pre-wrap;
          min-height: 460px;
          text-shadow: 0 0 4px #f9a72933, 0 0 1px #f9a729;
        }
        .terminal-command { color: #f9a729; font-weight: bold; }
        .terminal-output { color: #f4f4f4; font-family: 'IBM Plex Mono', 'Courier New', monospace !important; }
        @media (max-width: 768px) {
          .terminal-wrapper { min-height: 300px; font-size: 1rem; }
          .terminal-content { padding: 16px; min-height: 450px; }
          .terminal-buttons { padding: 12px 16px; }
          .terminal-button { font-size: 0.875rem; padding: 4px 10px; }
        }
      `}</style>
    </div>
  );
}
