import './globals.css'

export const metadata = {
  title: 'TecX LLM Interface',
  description: 'Running self-trained .pth models on Vercel',
  icons: {
    icon: '../../public//ep.png',
    //icon: '/favicon.ico', // Looks directly inside your assets configuration
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
