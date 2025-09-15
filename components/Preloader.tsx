// components/Preloader.tsx
'use client';

import React, { useState, useEffect, ReactNode } from 'react';

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  transition: 'opacity 0.3s ease',
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const spinnerStyle: React.CSSProperties = {
  width: '56px',
  height: '56px',
  border: '4px solid rgba(255,255,255,0.2)',
  borderTop: '4px solid #f9a729',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const textStyle: React.CSSProperties = {
  color: 'white',
  fontFamily: 'monospace',
  fontSize: '1rem',
  marginTop: '0.75rem',
};

export default function Preloader({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const onLoad = () => requestAnimationFrame(() => setReady(true));
    if (document.readyState === 'complete') onLoad();
    else {
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
  }, []);

  const visible = !(ready && hydrated);

  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      {visible && (
        <div style={{ ...overlayStyle, opacity: visible ? 1 : 0 }}>
          <div style={containerStyle}>
            <div style={spinnerStyle}></div>
            <code style={textStyle}>Loading Resultity…</code>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
