// components/unisection/LibGradient.tsx
'use client';

import React from 'react';

export const gradients = {
  red: [
    'linear-gradient(135deg, #ff4e50, #f9d423)',
    'linear-gradient(45deg, #f00000, #dc281e)',
    'linear-gradient(225deg, #ff0844, #ffb199)',
    'radial-gradient(circle at center, #ff4e50, #ff0000, #dc281e)',
    'conic-gradient(from 90deg at 50% 50%, #ff4e50, #f9d423, #f00000, #ff4e50)',
    'linear-gradient(135deg, #ff9a9e 0%, #ff4e50 30%, #ff0844 60%, #f00000 100%)',
  ],
  orange: [
    'linear-gradient(135deg, #f12711, #f5af19)',
    'linear-gradient(45deg, #ff8008, #ffc837)',
    'linear-gradient(225deg, #f83600, #f9d423)',
    'radial-gradient(circle at center, #ff8008, #ff6600, #ff3300)',
    'conic-gradient(from 90deg at 50% 50%, #ff8008, #ffc837, #f12711, #ff8008)',
    'linear-gradient(135deg, #ff9a00 0%, #ff7f00 30%, #ff4e00 60%, #ff0000 100%)',
  ],
  yellow: [
    'linear-gradient(135deg, #fceabb, #f8b500)',
    'linear-gradient(45deg, #f9d423, #ff4e50)',
    'linear-gradient(225deg, #f6d365, #fda085)',
    'radial-gradient(circle at center, #fffacd, #f9d423, #f8b500)',
    'conic-gradient(from 90deg at 50% 50%, #fceabb, #f8b500, #f9d423, #fceabb)',
    'linear-gradient(135deg, #fffacd 0%, #f9d423 30%, #f8b500 60%, #ff4e50 100%)',
  ],
  green: [
    'linear-gradient(135deg, #11998e, #38ef7d)',
    'linear-gradient(45deg, #56ab2f, #a8e063)',
    'linear-gradient(225deg, #00b09b, #96c93d)',
    'radial-gradient(circle at center, #38ef7d, #00b09b, #11998e)',
    'conic-gradient(from 90deg at 50% 50%, #11998e, #38ef7d, #56ab2f, #11998e)',
    'linear-gradient(135deg, #a8e063 0%, #56ab2f 30%, #38ef7d 60%, #00b09b 100%)',
  ],
  teal: [
    'linear-gradient(135deg, #136a8a, #267871)',
    'linear-gradient(45deg, #1d976c, #93f9b9)',
    'linear-gradient(225deg, #38ef7d, #11998e)',
    'radial-gradient(circle at center, #93f9b9, #1d976c, #136a8a)',
    'conic-gradient(from 90deg at 50% 50%, #136a8a, #93f9b9, #267871, #136a8a)',
    'linear-gradient(135deg, #93f9b9 0%, #1d976c 30%, #38ef7d 60%, #11998e 100%)',
  ],
  blue: [
    'linear-gradient(135deg, #2193b0, #6dd5ed)',
    'linear-gradient(45deg, #1c92d2, #f2fcfe)',
    'linear-gradient(225deg, #2b5876, #4e4376)',
    'radial-gradient(circle at center, #6dd5ed, #2193b0, #2b5876)',
    'conic-gradient(from 90deg at 50% 50%, #2193b0, #6dd5ed, #1c92d2, #2193b0)',
    'linear-gradient(135deg, #6dd5ed 0%, #2193b0 30%, #2b5876 60%, #4e4376 100%)',
  ],
  purple: [
    'linear-gradient(135deg, #9d50bb, #6e48aa)',
    'linear-gradient(45deg, #654ea3, #eaafc8)',
    'linear-gradient(225deg, #8e2de2, #4a00e0)',
    'radial-gradient(circle at center, #eaafc8, #9d50bb, #6e48aa)',
    'conic-gradient(from 90deg at 50% 50%, #9d50bb, #6e48aa, #8e2de2, #9d50bb)',
    'linear-gradient(135deg, #eaafc8 0%, #654ea3 30%, #8e2de2 60%, #4a00e0 100%)',
  ],
  pink: [
    'linear-gradient(135deg, #ff758c, #ff7eb3)',
    'linear-gradient(45deg, #ff9966, #ff5e62)',
    'linear-gradient(225deg, #f857a6, #ff5858)',
    'radial-gradient(circle at center, #ff7eb3, #ff758c, #f857a6)',
    'conic-gradient(from 90deg at 50% 50%, #ff758c, #ff7eb3, #f857a6, #ff758c)',
    'linear-gradient(135deg, #ff7eb3 0%, #ff758c 30%, #ff5e62 60%, #ff5858 100%)',
  ],
  gray: [
    'linear-gradient(135deg, #bdc3c7, #2c3e50)',
    'linear-gradient(45deg, #757f9a, #d7dde8)',
    'linear-gradient(225deg, #e0eafc, #cfdef3)',
    'radial-gradient(circle at center, #d7dde8, #757f9a, #2c3e50)',
    'conic-gradient(from 90deg at 50% 50%, #bdc3c7, #2c3e50, #757f9a, #bdc3c7)',
    'linear-gradient(135deg, #e0eafc 0%, #cfdef3 30%, #757f9a 60%, #2c3e50 100%)',
  ],
  black: [
    'linear-gradient(135deg, #000000, #434343)',
    'linear-gradient(45deg, #232526, #414345)',
    'linear-gradient(225deg, #010101, #212121)',
    'radial-gradient(circle at center, #434343, #232526, #000000)',
    'conic-gradient(from 90deg at 50% 50%, #000000, #434343, #232526, #000000)',
    'linear-gradient(135deg, #434343 0%, #232526 30%, #141e30 60%, #243b55 100%)',
  ],
};

type ColorKey = keyof typeof gradients;

export type LibGradientProps = {
  color: ColorKey;
  variant?: number;
  style?: React.CSSProperties;
  className?: string;
};

export function LibGradient({
  color,
  variant = 1,
  style,
  className,
}: LibGradientProps) {
  const list = gradients[color] || gradients.red;
  const index = Math.max(0, Math.min(list.length - 1, variant - 1));
  const background = list[index];

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        background,
        ...style,
      }}
    />
  );
}