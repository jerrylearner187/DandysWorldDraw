import React, { ReactNode, Suspense } from 'react'
import clsx from 'clsx'
import '../../globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import Plausible from '@/framework/components/Plausible'
import { AVAILABLE_LOCALES, transHrefLang } from '@/framework/locale/locale'
import { serverSideTranslations } from '@/framework/locale/serverSideTranslations'
import Header from '@/components/wegic/header'
import Footer from '@/components/wegic/footer'
import { Providers } from '@/app/[lang]/(public)/providers'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Toaster } from 'sonner';
import GoogleAdsense from '@/framework/components/GoogleAdsense'

export default async function AppLayout({
                                          children,
                                          params
                                        }: {
  children: ReactNode
  params?: { lang: AVAILABLE_LOCALES }
}) {
  const isDev = process.env.NODE_ENV === 'development'
  const i18n = await serverSideTranslations(
    params?.lang ?? AVAILABLE_LOCALES.en,
  )
  return (
    <html lang={transHrefLang(params?.lang ?? AVAILABLE_LOCALES.en)} suppressHydrationWarning>
    <head>
      <meta name="google-adsense-account" content="ca-pub-1014418574719042" />
    </head>
    <body
      suppressHydrationWarning
      className={clsx('min-h-screen font-sans antialiased bg-gradient-soft')}
    >
    <Providers params={{ i18n }}>
      <AntdRegistry>
        <Suspense>
          <Header lang={params?.lang} />
        </Suspense>
        {children}
        <Toaster richColors />
        <Footer params={params} />
      </AntdRegistry>
    </Providers>
    {
      /*G-SJ0Z7VPH67 AI-outpainting专属*/
      /*mxys3i7q8w  AI-outpainting专属*/
      !isDev &&
      (
        <>
          <GoogleAnalytics gaId="G-82T2T1PD76" />
          <GoogleAdsense />
          {/*<MicrosoftClarity clarityId="mxys3i7q8w"/>*/}
          <Plausible />
          {/*<Monetag />*/}
        </>
      )
    }
    </body>
    </html>
  )
}
