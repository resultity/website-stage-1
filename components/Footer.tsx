// components/Footer.tsx
'use client'

import React from 'react'
import RLink from '@/components/rlink'
import { ROUTES as R } from '@/app/routes'
import { useLang } from '@/components/locale'
import dicts from '@/components/navbar/locale'
import { IconBrandGithub, IconBrandMedium, IconBrandTelegram, IconBrandX } from '@tabler/icons-react'
import TextPressure from './text/TextPressure'


export default function Footer() {
  const lang = useLang()
  const t = dicts[lang] ?? dicts.en

  return (
    <footer className="footer has-background-black has-text-white py-6">
      <div className="container">
        <div className="columns is-variable is-7">
          {/* Brand */}
          <div className="column is-4">
            
            <ul className="is-flex is-flex-wrap-wrap mt-4">
              <li className="mr-3 mb-2">
               <RLink className="has-text-grey-light" route={R.x.href}><IconBrandX size={36} color="#ffffff"/></RLink>
              </li>
              <li className="mr-3 mb-2">
                <RLink className="has-text-grey-light" route={R.github.href}><IconBrandGithub size={36} color="#ffffff"/></RLink>
              </li>
              <li className="mr-3 mb-2">
                <RLink className="has-text-grey-light" route={R.tg.href}><IconBrandTelegram size={36} color="#ffffff"/></RLink>
              </li>
              <li className="mr-3 mb-2">
                <RLink className="has-text-grey-light" route={R.blog.href}><IconBrandMedium size={36} color="#ffffff"/></RLink>
              </li>
            </ul>
            <p className='is-size-7 is-family-secondary has-font-weight-light'>{t.footerSubHeader}</p>
            <TextPressure text='Resultity' ></TextPressure>
           
            
  
            </div>
 <div className="column is-2"></div>
          
         
          {/* Explore */}
          <div className="column is-3">
            <h5 className="title is-6 has-text-white">{t.footerCol1}</h5>
            <ul>
              <li><RLink className="has-text-grey-light" route={R.home.href}>{t.main}</RLink></li>
              <li><RLink className="has-text-grey-light" route={R.node.href}>{t.dropdowns.productsLeft.node}</RLink></li>
                             <li><RLink className="has-text-grey-light" route={R.cloud.href}>{t.dropdowns.productsLeft.cloud}</RLink></li>
              <li><RLink className="has-text-grey-light" route={R.vision.href}>{t.dropdowns.companyVision.vision}</RLink></li>

            </ul>
          </div>

          {/* Resources */}
          <div className="column is-3">
            <h5 className="title is-6 has-text-white">{t.footerCol2}</h5>
            <ul>
              <li><RLink className="has-text-grey-light" route={R.docs.href}>{t.dropdowns.companyVision.docs}</RLink></li>
              <li><RLink className="has-text-grey-light" route={R.roadmap.href}>{t.dropdowns.productsRight.roadmap}</RLink></li>
              <li><RLink className="has-text-grey-light" route={R.testnet.href}>{t.dropdowns.productsRight.testnet}</RLink></li>
              <li><RLink className="has-text-grey-light" route={R.token.href}>{t.token}</RLink></li>
              <li className='is-size-7'><RLink className="has-text-grey-light" route={R.privacy.href}>{t.privacy}</RLink></li>
            </ul>
          </div>

          {/* Community */}

        </div>

        <div className="content has-text-centered has-text-grey-light mt-6 is-size-7">
          © {new Date().getFullYear()} Resultity. {t.footerCopyright}
        </div>
      </div>
    </footer>
  )
}
