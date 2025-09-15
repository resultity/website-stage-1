// components/blocks/IconCard.tsx
'use client'

import React from 'react'
import clsx from 'clsx'

type IconCardProps = {
  icon: React.ReactNode
  title?: string
  children?: React.ReactNode
  className?: string
}

export default function IconCard({
  icon,
  title,
  children,
  className,
}: IconCardProps) {
  return (
    <div className="box">
      <div className={clsx('card icon-card', className)}>
        <div className="card-content has-text-white">
          <div className="title-wrapper">
            <div className="icon-wrapper">{icon}</div>
            {title && <p className="title has-text-white is-5">{title}</p>}
          </div>
          {children && title && <div className="card-line" />}
          {children && <div className="content mt-2">{children}</div>}
        </div>
      </div>
      <style jsx>{`
        .title-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          
        }
        .card-line {
          width: 5vh;
          height: 2px;
          background: #fff;
          margin: 0.5rem auto;
        }
        .icon-wrapper {
          width: 4rem;
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed #f9a729;
          border-radius: 50%;
          transition: border-style 0.3s ease;
        }
        .icon-card:hover .icon-wrapper {
          border-style: solid;
        }
        .icon-wrapper :global(svg) {
          width: 2rem;
          height: 2rem;
          color: #fff;
        }
        .icon-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: none;
          overflow: hidden;
          border-radius: 0.75rem;
          height: 100%;
        }
        .icon-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        .box {
          display: flex;
          flex-direction: column;
          flex: 1;
          position: relative;
          border-radius: 1rem;
          overflow: hidden;
          transform: perspective(1500px) rotateY(-5deg);
          box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .box:hover {
          transform: perspective(3000px) rotateY(5deg) translateY(-8px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}
