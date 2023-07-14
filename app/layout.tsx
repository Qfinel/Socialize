import './globals.css'
import type { Metadata } from 'next'
import { Session } from 'next-auth'
import { Provider } from '@/components'

export const metadata: Metadata = {
  title: 'Socialize',
  description: 'A modern social media app',
}

export interface RootProps {
  children: React.ReactNode,
  session: Session
}


export default function RootLayout({children, session}: RootProps) {
  return (
    <html lang="en">
      <body>
        {/* <Provider session={session}> */}
          {children}
        {/* </Provider> */}
      </body>
    </html>
  )
}
