// components/backs/Gradient.tsx
'use client'

import clsx from 'clsx'

type GradientProps = {
  variant: 'black' | 'dark' | 'orange' | 'light' | 'white'
  form?: 'simple' | 'wave' | 'radial'
  className?: string
}

const variantMap = {
  black: {
    simple: 'linear-gradient(to bottom, #000 0%, #181818 70%, #f9a729 98%, #f9a72900 100%)',
    wave: `
      radial-gradient(ellipse at 50% 120%, 
        #000 0%, 
        #1a1a1a 55%, 
        #f9a729 85%, 
        #f9a729cc 95%, 
        #f9a72900 100%
      )`,
    radial: `
      radial-gradient(circle at 50% 55%, 
        #000 0%, 
        #222 65%, 
        #f9a729 80%, 
        #f9a729aa 95%, 
        #f9a72900 100%
      )`,
  },
  dark: {
    simple: 'linear-gradient(to bottom, #b34b00 0%, #222 45%, #000 95%, #00000000 100%)',
    wave: `
      radial-gradient(ellipse at 50% 80%, 
        #b34b00 0%, 
        #222 60%, 
        #000 95%, 
        #00000000 100%
      )`,
    radial: `
      radial-gradient(circle at 50% 55%, 
        #b34b00 0%, 
        #222 60%, 
        #000 85%, 
        #00000000 100%
      )`,
  },
  orange: {
    simple: 'linear-gradient(to bottom, #f9a729 0%, #ff6600 60%, #ff3300 90%, #ff330000 100%)',
    wave: `
      radial-gradient(ellipse at 50% 0%, 
        #ff6600 0%, 
        #f9a729 40%, 
        #ff3300 80%, 
        #ff330099 95%, 
        #ff330000 100%
      )`,
    radial: `
      radial-gradient(circle at 50% 40%, 
        #f9a729 0%, 
        #ff6600 55%, 
        #ff3300 90%, 
        #ff330099 98%, 
        #ff330000 100%
      )`,
  },
  light: {
    simple: 'linear-gradient(to bottom, #fce5c5 0%, #ddd 60%, #fff 95%, #ffffff00 100%)',
    wave: `
      radial-gradient(ellipse at 50% 80%, 
        #fce5c5 0%, 
        #ddd 60%, 
        #fff 100%, 
        #ffffff00 100%
      )`,
    radial: `
      radial-gradient(circle at 50% 60%, 
        #fce5c5 0%, 
        #ddd 60%, 
        #fff 99%, 
        #ffffff00 100%
      )`,
  },
  white: {
    simple: 'linear-gradient(to bottom, #fff 0%, #f9a729 98%, #f9a72900 100%)',
    wave: `
      radial-gradient(ellipse at 50% 120%, 
        #fff 0%, 
        #f9a729 90%, 
        #f9a729bb 98%, 
        #f9a72900 100%
      )`,
    radial: `
      radial-gradient(circle at 50% 55%, 
        #fff 0%, 
        #f9a729 85%, 
        #f9a729bb 98%, 
        #f9a72900 100%
      )`,
  },
}


export default function Gradient({
  variant,
  form = 'simple',
  className,
}: GradientProps) {
  const background = variantMap[variant]?.[form]

  return (
    <div
      className={clsx('unisection-back-layer', className)}
      style={{
        position: 'absolute',
        inset: 0,
        background,
        zIndex: 0,
        pointerEvents: 'none',
        minHeight: '100%',
        minWidth: '100%',
      }}
    />
  )
}