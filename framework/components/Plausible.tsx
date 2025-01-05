'use client'

import Script from "next/script"
import { siteConfig } from '@/config/site'

const Plausible = () => {
  return (
    <Script
      defer
      data-domain={siteConfig.domain}
      src="https://app.pageview.app/js/script.js"
    />
  )
}

export default Plausible