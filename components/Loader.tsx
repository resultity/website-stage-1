'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleStart = () => {
      clearTimeout(timeout)
      setLoading(true)
    }

    const handleComplete = () => {
      timeout = setTimeout(() => setLoading(false), 300) // slight delay to smooth transition
    }

    window.addEventListener('next-navigate-start', handleStart)
    window.addEventListener('next-navigate-end', handleComplete)

    return () => {
      window.removeEventListener('next-navigate-start', handleStart)
      window.removeEventListener('next-navigate-end', handleComplete)
      clearTimeout(timeout)
    }
  }, [pathname])

  return (
    <>
      {loading && <div className="page-loader" />}
      <style jsx>{`
        .page-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          z-index: 9999;
          pointer-events: none;
          animation: fadeOutLoader 1s ease-in-out forwards;
        }

        @keyframes fadeOutLoader {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
