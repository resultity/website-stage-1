// app/layout.tsx
import '../styles/bulma-custom.scss'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body data-theme="dark">{children}</body>
    </html>
  )
}