'use client'

import RLink from '@/components/rlink'
import { ROUTES as R } from '@/app/routes'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useMemo } from 'react'
import TokenDropdownDesktop from '@/components/navbar/TokenDesktop'
import TokenDropdownMobile from '@/components/navbar/TokenMobile'
import ProductsDropdownDesktop from '@/components/navbar/ProductsDesktop'
import ProductsDropdownMobile from '@/components/navbar/ProductsMobile'
import CompanyDropdownDesktop from '@/components/navbar/CompanyDesktop'
import CompanyDropdownMobile from '@/components/navbar/CompanyMobile'
import { useLang } from '@/components/locale'
import dicts from './navbar/locale'
import { useWaitlistModal } from '@/components/Waitlist'
import Image from 'next/image'

export default function Navbar() {
  const pathname = usePathname()
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)
const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const lang = useLang()
  const t = dicts[lang] ?? dicts.en

  const { openWaitlist } = useWaitlistModal()

  const { productsLeft, productsRight, companyVision, companyCommunity } = useMemo(
    () => ({
      productsLeft: [
        { children: t.dropdowns.productsLeft.cloud, route: R.cloud.href },
        { children: t.dropdowns.productsLeft.node, route: R.node.href },
      ],
      productsRight: [
        { children: t.dropdowns.productsRight.roadmap, route: R.roadmap.href },
        { children: t.dropdowns.productsRight.testnet, route: R.testnet.href },
        { children: t.dropdowns.companyVision.docs, route: R.docs.href },
      ],
      companyVision: [{ children: t.dropdowns.companyVision.vision, route: R.vision.href }],
      companyCommunity: [
        { children: t.dropdowns.companyCommunity.blog, route: R.blog.href },
        { children: t.dropdowns.companyCommunity.x, route: R.x.href },
        { children: t.dropdowns.companyCommunity.telegram, route: R.tg.href },
      ],
    }),
    [t]
  )

  const toggleDropdown = (key: string) => {
    setOpenMobileDropdown(prev => (prev === key ? null : key))
  }

  useEffect(() => {
    const burger = document.querySelector<HTMLAnchorElement>('.navbar-burger');
    const menu   = document.querySelector<HTMLDivElement>('.navbar-menu');
    if (!burger || !menu) return;

    const toggleMenu = () => {
      burger.classList.toggle('is-active')
      menu.classList.toggle('is-active')
    }

    burger.addEventListener('click', toggleMenu)

    const closeMenu = () => {
      burger.classList.remove('is-active')
      menu.classList.remove('is-active')
       setOpenMobileDropdown(null);
      setOpenDesktopDropdown(null);
      setOpenMobileDropdown(null)
    }

    menu.querySelectorAll<HTMLAnchorElement>('a.navbar-item').forEach(link => {
      link.addEventListener('click', closeMenu)
    })

    const onInternalNav = () => closeMenu();
     window.addEventListener('rtity:show-loader', onInternalNav as EventListener);
  menu.querySelectorAll<HTMLAnchorElement>('a.navbar-item').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  closeMenu();

    return () => {
      burger.removeEventListener('click', toggleMenu)
      menu.querySelectorAll<HTMLAnchorElement>('a.navbar-item').forEach(link => {
        link.removeEventListener('click', closeMenu)
      })
    }
  }, [pathname])

  return (
    <>
      <nav className="navbar is-fixed-top has-background-black has-shadow" role="navigation" aria-label="main navigation">
        <div className="container is-fluid px-3-mobile">
          <div className="navbar-brand">
            <RLink className="navbar-item" route={R.home.href}>
              <Image
                src="/logo-white.svg"
                alt="Resultity Network"
                width={160}
                height={32}
                priority
                className="navbar-logo"
                style={{ height: '2rem', width: 'auto' }}
              />
            </RLink>
            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
              <RLink className="navbar-item" route={R.home.href}>
                {t.main}
              </RLink>

              <RLink route={R.nodeInstall.href} className="navbar-item navbar-item-run">
                {t.runNode}
              </RLink>

              <div
                className={`navbar-item has-dropdown is-hidden-touch ${openDesktopDropdown === 'products' ? 'is-active' : ''}`}
                onMouseEnter={() => setOpenDesktopDropdown('products')}
                onMouseLeave={() => setOpenDesktopDropdown(null)}
              >
                <button
                  className="navbar-link"
                  onFocus={() => setOpenDesktopDropdown('products')}
                  onBlur={() => setOpenDesktopDropdown(null)}
                  onClick={() => setOpenDesktopDropdown(v => (v === 'products' ? null : 'products'))}
                  aria-expanded={openDesktopDropdown === 'products'}
                >
                  {t.products}
                </button>
                <div className="navbar-dropdown px-4 py-4">
                  <ProductsDropdownDesktop productsLeft={productsLeft} productsRight={productsRight} />
                </div>
              </div>
              <div className="navbar-item is-hidden-desktop">
                <button
                  onClick={() => toggleDropdown('products')}
                  className="is-flex is-justify-content-space-between is-align-items-center w-full has-text-white"
                >
                  <span>{t.products}</span>
                  <span className="ml-2 has-text-primary">{openMobileDropdown === 'products' ? '▲' : '▼'}</span>
                </button>
                {openMobileDropdown === 'products' && (
                  <ProductsDropdownMobile productsLeft={productsLeft} productsRight={productsRight} />
                )}
              </div>

              <div
  className={`navbar-item has-dropdown is-hidden-touch ${openDesktopDropdown === 'token' ? 'is-active' : ''}`}
  onMouseEnter={() => setOpenDesktopDropdown('token')}
  onMouseLeave={() => setOpenDesktopDropdown(null)}
>
  <button
    className="navbar-link"
    onFocus={() => setOpenDesktopDropdown('token')}
    onBlur={() => setOpenDesktopDropdown(null)}
    onClick={() => setOpenDesktopDropdown(v => (v === 'token' ? null : 'token'))}
    aria-expanded={openDesktopDropdown === 'token'}
  >
    {t.token}
  </button>
  <div className="navbar-dropdown px-4 py-4">
    <TokenDropdownDesktop />
  </div>
</div>
              <div className="navbar-item is-hidden-desktop">
                <button
                  onClick={() => toggleDropdown('token')}
                  className="is-flex is-justify-content-space-between is-align-items-center w-full has-text-white"
                >
                  <span>{t.token}</span>
                  <span className="ml-2 has-text-primary">{openMobileDropdown === 'token' ? '▲' : '▼'}</span>
                </button>
                {openMobileDropdown === 'token' && <TokenDropdownMobile />}
              </div>

              <div
  className={`navbar-item has-dropdown is-hidden-touch ${openDesktopDropdown === 'company' ? 'is-active' : ''}`}
  onMouseEnter={() => setOpenDesktopDropdown('company')}
  onMouseLeave={() => setOpenDesktopDropdown(null)}
>
  <button
    className="navbar-link"
    onFocus={() => setOpenDesktopDropdown('company')}
    onBlur={() => setOpenDesktopDropdown(null)}
    onClick={() => setOpenDesktopDropdown(v => (v === 'company' ? null : 'company'))}
    aria-expanded={openDesktopDropdown === 'company'}
  >
    {t.company}
  </button>
  <div className="navbar-dropdown px-4 py-4">
    <CompanyDropdownDesktop companyVision={companyVision} companyCommunity={companyCommunity} />
  </div>
</div>
              <div className="navbar-item is-hidden-desktop">
                <button
                  onClick={() => toggleDropdown('company')}
                  className="is-flex is-justify-content-space-between is-align-items-center w-full has-text-white"
                >
                  <span>{t.company}</span>
                  <span className="ml-2 has-text-primary">{openMobileDropdown === 'company' ? '▲' : '▼'}</span>
                </button>
                {openMobileDropdown === 'company' && (
                  <CompanyDropdownMobile companyVision={companyVision} companyCommunity={companyCommunity} />
                )}
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <button className="button is-primary is-family-monospace" onClick={openWaitlist}>
                  {t.waitlist}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navbar-item.has-dropdown {
          position: relative;
        }

        .navbar-dropdown {
          border-radius: 0.5rem;
        }

        html,
        body {
          overflow-x: hidden;
          max-width: 100vw;
        }

        @media (max-width: 768px) {
          .navbar-dropdown {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }

          .navbar .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        .navbar-burger span {
          background-color: #f9a729;
        }
        .navbar-item.has-dropdown .navbar-dropdown { display: none; }
        .navbar-item.has-dropdown.is-active .navbar-dropdown { display: block; }
      `}</style>
    </>
  )
}
