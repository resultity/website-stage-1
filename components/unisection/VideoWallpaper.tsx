// VideoWallpaper.tsx — background video (YouTube, Vimeo, direct MP4, etc.) with Bulma-friendly sizing
// API mirrors Wallpaper.tsx where sensible. Object-fit emulation for iframes. No external deps beyond React and clsx.

'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'

type FitMode = 'cover' | 'contain' | 'height' | 'width'
type Provider = 'youtube' | 'vimeo' | 'direct'

type VideoWallpaperProps = {
  src: string                           // video URL (YouTube/Vimeo page or direct .mp4/.webm)
  start?: number                        // start time in seconds (YT/Vimeo/direct)
  end?: number                          // end time in seconds (YT only via loop playlist trick; ignored for others)
  loop?: boolean                        // loop video (default true)
  muted?: boolean                       // force mute (default true for autoplay)
  autoplay?: boolean                    // auto play (default true)
  playsInline?: boolean                 // iOS inline (default true)
  controls?: boolean                    // show controls (default false)
  background?: string                   // container background color
  opacity?: number                      // wrapper opacity (default 1)
  blendMode?: React.CSSProperties['mixBlendMode'] // wrapper mix-blend-mode
  blur?: number                         // CSS blur(px)
  brightness?: number                   // CSS brightness(0..n)
  grayscale?: number                    // CSS grayscale(0..1)
  posX?: number                         // object-position X% (0..100), used for direct video
  posY?: number                         // object-position Y% (0..100), used for direct video
  zoom?: number                         // scale percent for direct video (default 100)
  parallax?: boolean                    // lightweight mouse parallax translate (default false)
  parallaxStrength?: number             // px offset range for parallax
  className?: string
  style?: React.CSSProperties

  // fit controls to emulate object-fit for iframe providers
  fit?: FitMode                         // default 'cover'
  mobileFit?: FitMode                   // optional override on mobile
  mobileBreakpoint?: number             // px, default 768
  videoAspect?: number                  // aspect ratio (width/height) used for iframe sizing, default 16/9

  // performance toggles
  priority?: boolean                    // hint to preload if possible (direct video only)
}

export default function VideoWallpaper({
  src,
  start,
  end,
  loop = true,
  muted = true,
  autoplay = true,
  playsInline = true,
  controls = false,
  background = '#000',
  opacity = 1,
  blendMode,
  blur,
  brightness,
  grayscale,
  posX = 50,
  posY = 50,
  zoom = 100,
  parallax = false,
  parallaxStrength = 30,
  className,
  style,
  fit = 'cover',
  mobileFit,
  mobileBreakpoint = 768,
  videoAspect = 16 / 9,
  priority = false,
}: VideoWallpaperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [box, setBox] = useState({ w: 0, h: 0 })
  const provider = useMemo<Provider>(() => detectProvider(src), [src])
  const videoId = useMemo(() => extractId(src, provider), [src, provider])

  // mobile breakpoint watcher
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [mobileBreakpoint])

  // container size observer (for iframe fit calc)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect
      if (r) setBox({ w: r.width, h: r.height })
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // parallax handler (wrapper translate)
  useEffect(() => {
    if (!parallax) return
    const handle = (e: MouseEvent | TouchEvent) => {
      const el = containerRef.current
      if (!el) return
      let clientX = 0, clientY = 0
      if ('touches' in e) {
        clientX = e.touches[0]?.clientX ?? 0
        clientY = e.touches[0]?.clientY ?? 0
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }
      const rect = el.getBoundingClientRect()
      const relX = (clientX - rect.left) / rect.width - 0.5
      const relY = (clientY - rect.top) / rect.height - 0.5
      setOffset({ x: relX * parallaxStrength, y: relY * parallaxStrength })
    }
    window.addEventListener('mousemove', handle, { passive: true })
    window.addEventListener('touchmove', handle, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handle)
      window.removeEventListener('touchmove', handle)
    }
  }, [parallax, parallaxStrength])

  useEffect(() => {
    if (!parallax) setOffset({ x: 0, y: 0 })
  }, [parallax])

  // build CSS filters
  const filters = useMemo(() => {
    return [
      blur !== undefined ? `blur(${blur}px)` : '',
      brightness !== undefined ? `brightness(${brightness})` : '',
      grayscale !== undefined ? `grayscale(${grayscale})` : '',
    ]
      .filter(Boolean)
      .join(' ')
  }, [blur, brightness, grayscale])

  // compute effective fit and resulting iframe size for object-fit emulation
  const effFit: FitMode = (isMobile && mobileFit) ? mobileFit : fit
  const { vw, vh } = useMemo(() => {
    if (!box.w || !box.h) return { vw: '100%', vh: '100%' }
    const containerRatio = box.w / box.h
    if (effFit === 'width') return { vw: '100%', vh: 'auto' }
    if (effFit === 'height') return { vw: 'auto', vh: '100%' }
    if (effFit === 'cover') {
      if (containerRatio > videoAspect) {
        return { vw: '100%', vh: 'auto' } // fill width
      } else {
        return { vw: 'auto', vh: '100%' } // fill height
      }
    }
    // contain
    if (containerRatio > videoAspect) {
      return { vw: 'auto', vh: '100%' } // fit height
    } else {
      return { vw: '100%', vh: 'auto' } // fit width
    }
  }, [box.w, box.h, effFit, videoAspect])

  // build provider-specific embed URL or mark as direct
  const embedSrc = useMemo(() => {
    if (provider === 'youtube' && videoId) {
      const base = `https://www.youtube-nocookie.com/embed/${videoId}`
      const params = new URLSearchParams({
        autoplay: autoplay ? '1' : '0',
        mute: muted ? '1' : '0',
        controls: controls ? '1' : '0',
        playsinline: playsInline ? '1' : '0',
        loop: loop ? '1' : '0',
        modestbranding: '1',
        rel: '0',
        iv_load_policy: '3',
        showinfo: '0',
        enablejsapi: '0',
        // YouTube requires playlist=VIDEO_ID to loop a single video
        playlist: videoId,
      })
      if (start !== undefined) params.set('start', String(start))
      if (end !== undefined) params.set('end', String(end))
      return `${base}?${params.toString()}`
    }
    if (provider === 'vimeo' && videoId) {
      const base = `https://player.vimeo.com/video/${videoId}`
      const params = new URLSearchParams({
        background: '1',
        autoplay: autoplay ? '1' : '0',
        muted: muted ? '1' : '0',
        loop: loop ? '1' : '0',
        controls: controls ? '1' : '0',
        autopause: '0',
        dnt: '1',
      })
      if (start !== undefined) params.set('#t', `${start}s`)
      return `${base}?${params.toString()}`
    }
    return null
  }, [provider, videoId, autoplay, muted, controls, playsInline, loop, start, end])

  // shared wrapper transform (parallax and zoom for direct video)
  const sharedTransform = `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`

  return (
    <div
      ref={containerRef}
      className={clsx('unisection-back-video', className)}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        background,
        ...style,
      }}
    >
      {/* Provider: YouTube/Vimeo via iframe (filters applied on wrapper) */}
      {(provider === 'youtube' || provider === 'vimeo') && embedSrc && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: vw,
            height: vh,
            transform: sharedTransform,
            pointerEvents: 'none',
            userSelect: 'none',
            filter: filters || undefined,
            opacity,
            mixBlendMode: blendMode,
            transition: parallax
              ? 'transform 0.2s cubic-bezier(.34,1.56,.64,1), filter 0.3s'
              : 'filter 0.3s',
            willChange: 'transform, filter',
          }}
        >
          <iframe
            title="background-video"
            src={embedSrc}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen={false}
            frameBorder={0}
            tabIndex={-1}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              border: 0,
            }}
          />
        </div>
      )}

      {/* Provider: direct video (mp4/webm etc.) with real object-fit and object-position */}
      {provider === 'direct' && (
        <video
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          controls={controls}
          preload={priority ? 'auto' : 'metadata'}
          src={src}
          // Fallback sources example:
          // <source src={src} type="video/mp4" />
          // Add WebM if you have multiple variants.
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `${sharedTransform} scale(${zoom / 100})`,
            objectFit: effFit === 'height' || effFit === 'width' ? 'unset' : effFit,
            objectPosition: `${posX}% ${posY}%`,
            width:
              effFit === 'height'
                ? 'auto'
                : '100%',
            height:
              effFit === 'width'
                ? 'auto'
                : '100%',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 1,
            filter: filters || undefined,
            opacity,
            mixBlendMode: blendMode,
            transition: parallax
              ? 'transform 0.2s cubic-bezier(.34,1.56,.64,1), filter 0.3s'
              : 'filter 0.3s',
            willChange: 'transform, filter',
          }}
        />
      )}
    </div>
  )
}

/* -------- Provider helpers -------- */

function detectProvider(url: string): Provider {
  const u = url.toLowerCase()
  if (/youtube\.com|youtu\.be/.test(u)) return 'youtube'
  if (/vimeo\.com/.test(u)) return 'vimeo'
  // naive direct detection for common extensions or CDN paths
  if (/\.(mp4|webm|ogg)(\?|#|$)/.test(u)) return 'direct'
  if (/cloudfront|akamaized|cdn|video/.test(u)) return 'direct'
  return 'direct'
}

function extractId(url: string, provider: Provider): string | null {
  try {
    if (provider === 'youtube') {
      // supports youtu.be/<id>, youtube.com/watch?v=<id>, /embed/<id>, with extra params
      const u = new URL(url)
      if (u.hostname.includes('youtu.be')) {
        return u.pathname.split('/')[1] || null
      }
      const v = u.searchParams.get('v')
      if (v) return v
      const path = u.pathname.split('/')
      const idx = path.findIndex((p) => p === 'embed' || p === 'shorts' || p === 'v')
      if (idx >= 0 && path[idx + 1]) return path[idx + 1]
      // quick fallback for raw IDs
      if (/^[a-zA-Z0-9_-]{6,}$/.test(url)) return url
      return null
    }
    if (provider === 'vimeo') {
      // supports vimeo.com/<id> or player.vimeo.com/video/<id>
      const u = new URL(url)
      const parts = u.pathname.split('/').filter(Boolean)
      const last = parts[parts.length - 1]
      return last && /^\d+$/.test(last) ? last : null
    }
  } catch {
    // if URL constructor fails, try raw id patterns
    if (provider === 'youtube' && /^[a-zA-Z0-9_-]{6,}$/.test(url)) return url
    if (provider === 'vimeo' && /^\d+$/.test(url)) return url
  }
  return null
}
