'use client'

import Script from "next/script"
import { siteConfig } from '@/config/site'

const GoogleAdsense = () => {
  return (
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1014418574719042"
     crossOrigin="anonymous"></script>
  )
}

export default GoogleAdsense