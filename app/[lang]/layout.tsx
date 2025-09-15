// app/[lang]/layout.tsx
import { GoogleAnalytics } from "@next/third-parties/google";
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { isSupportedLang } from '@/app/lang'
import Preloader from '@/components/Preloader'
import { WaitlistProvider } from '@/components/Waitlist'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { RLinkLoadingOverlay } from '@/components/rlink'
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  if (!isSupportedLang(lang)) notFound()

  return (
    <Preloader>
      <WaitlistProvider>
        <Navbar />
         <RLinkLoadingOverlay />
        {children}
        <Footer />
        <LanguageSwitcher />
        <GoogleAnalytics gaId="G-6J117ZKQZP" />
      </WaitlistProvider>
    </Preloader>
  )
}
