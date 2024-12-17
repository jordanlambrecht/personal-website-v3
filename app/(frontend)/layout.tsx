import 'react-notion-x/src/styles.css'
import '@/styles/globals.css'
import { Metadata } from 'next'
import { Link } from '@nextui-org/link'
import clsx from 'clsx'

import { Providers } from './providers'

import { LogoProvider } from '@/context/logoContext'
import { siteConfig } from '@/lib/site'
import { fontSans } from '@/lib/fonts'
import Test from '@/components/navbar'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head />
      <body
        className={clsx(
          'min-h-screen  font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <div className='relative flex flex-col h-screen'>
            <LogoProvider>
              <Test />
            </LogoProvider>
            <main className='container flex-grow px-12 mx-auto md:pt-16 max-w-7xl'>
              {children}
            </main>
            <footer className='flex items-center justify-center w-full py-3'>
              <Link
                isExternal
                className='flex items-center gap-1 text-current'
                href='https://nextui-docs-v2.vercel.app?utm_source=next-app-template'
                title='nextui.org homepage'
              >
                <span className='text-default-600'>Powered by</span>
                <p className='text-primary'>NextUI</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
