import './globals.css'

export const metadata = {
  title: 'TecX LLM Interface',
  description: 'Running self-trained .pth models on Vercel',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
