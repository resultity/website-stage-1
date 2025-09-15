// components/blocks/FeaturesGrid.tsx

'use client'

import React from 'react'
import Image from 'next/image'
import Uniblock from '@/components/Uniblock'
import Gradient from '../unisection/Gradient'
import Particles from '../unisection/Particles'

export type Feature = {
  title: string
  imageSrc: string
  alt: string
  description: string
}

type FeaturesGridProps = {
  features: Feature[]
}

export default function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <div className="columns is-variable is-6 is-multiline is-centered">
      {features.map((feature, idx) => (
        <div key={idx} className="column is-4-desktop is-12-mobile">
          <div className="card feature-card content">
            <Uniblock opacity={[[1, 0.35]]}>
              <Gradient variant="dark" form="wave" />
              <Particles />

              <>
                <header className="card-header">
                  <p className="card-header-title is-family-monospace has-text-primary is-size-5">
                    {feature.title}
                  </p>
                </header>

                <div className="card-image is-relative">
                  {/* Square container for Next/Image with fill */}
                  <figure className="image image-square">
                    <Image
                      fill
                      priority={idx < 2}
                      src={feature.imageSrc}
                      alt={feature.alt}
                      className="p-6"
                      sizes="(max-width: 768px) 100vw, (max-width: 1215px) 50vw, 33vw"
                      style={{ objectFit: 'contain' }}
                    />
                  </figure>

                  <div className="image-overlay">
                    <p className="is-size-6 has-text-white is-family-secondary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </>
            </Uniblock>
          </div>
        </div>
      ))}

      <style jsx>{`
        .feature-card {
          position: relative;
          border-radius: 1rem;
          overflow: hidden;
          transform: perspective(1500px) rotateY(-5deg);
          box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .feature-card:hover {
          transform: perspective(3000px) rotateY(5deg) translateY(-8px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .card-image.is-relative {
          position: relative;
        }

        /* Square aspect wrapper for Next/Image with fill */
        .image-square {
          position: relative;
          width: 100%;
          padding-top: 100%; /* 1:1 */
          overflow: hidden;
        }

        .image-overlay {
          position: absolute;
          bottom: -2rem;
          left: 0;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(6px);
          padding: 5rem 2rem;
          opacity: 0.45;
          font-weight: bold;
          transition: opacity 0.4s ease;
        }
        .feature-card:hover .image-overlay {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}
