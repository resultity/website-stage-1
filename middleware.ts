// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const SUPPORTED_LANGUAGES = ['en', 'ru', 'id']
const DEFAULT_LANG = 'en'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/') {
    const acceptLang = request.headers.get('accept-language') || ''
    const primaryLang = acceptLang.split(',')[0].split('-')[0]
    const locale = SUPPORTED_LANGUAGES.includes(primaryLang) ? primaryLang : DEFAULT_LANG

    const url = request.nextUrl.clone()
    url.pathname = `/${locale}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
