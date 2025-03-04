import {t} from '@lingui/macro'
import {siteConfig, tdkConfig} from '@/config/site'
import { activateLocale, AVAILABLE_LOCALES, metadataLanguages } from '@/framework/locale/locale'
import { i18n } from '@lingui/core'
import { Metadata } from 'next'

// export const runtime = 'edge';
export const dynamic = "force-static";
export const dynamicParams = false;
export async function generateStaticParams() {
  // 构建时生成静态页面
  const allLang = []
  for (const langDir of Object.values(AVAILABLE_LOCALES)) {
    allLang.push({ lang: langDir })
  }
  return allLang
}

export async function generateMetadata({
  params
}: {
  params: { slug: string, lang: AVAILABLE_LOCALES}
}
): Promise<Metadata> {
    // 必须主动激活一下当前语言，否则t函数不生效
    await activateLocale(params.lang)
    const title = t`Terms of Service` + ' | ' + i18n._(siteConfig.name)
    return {
        title,
        description: i18n._(tdkConfig.description),
        alternates: {
        canonical: params.lang != 'en' ? `${process.env.UE_WEB_API_URL}/${params.lang}/about/terms-of-service` : `${process.env.UE_WEB_API_URL}/about/terms-of-service` ,
        languages:metadataLanguages('/about/terms-of-service')
    },
    icons: {
        icon: siteConfig.icon,
    }
  }
}

export default async function TermsPage({
                                            params
                                          }: {
  params: { lang: AVAILABLE_LOCALES}
}) {
  await activateLocale(params.lang)
  return (
    <div className='prose mx-auto p-6 text-gray-500'>
      <h1 className='text-primary'>{t`Terms of Service for #0#`.replace('#0#', i18n._(siteConfig.name))}</h1>
      <p>{t`Welcome to #0#! Our website, located at #1# (Website), is dedicated to providing you with the ability to create custom images. By accessing or using our Website, you agree to be bound by these Terms of Service (Terms). If you do not agree with any part of the terms, then you are prohibited from using the Website.`.replace('#0#', i18n._(siteConfig.name)).replace('#1#', siteConfig.url)}</p>
      <h2 className='text-secondary'>{t`1. Use License`}</h2>
      <p>{t`You are granted a limited, non-exclusive, non-transferable license to use the Website and its services for personal, non-commercial purposes. This license does not include any rights to copy, modify, or distribute the Website's content or use it for commercial purposes without our prior written consent.`}</p>
      <h2 className='text-secondary'>{t`2. Ownership`}</h2>
      <p>{t`The ownership of images generated from text on the Website belongs to the person who created the image. #0# claims no ownership over images created by users.`.replace('#0#', i18n._(siteConfig.name))}</p>
      <h2 className='text-secondary'>{t`3. User Data Collection`}</h2>
      <p>{t`We collect personal data (name, email, and payment information) and non-personal data (web cookies) to improve our services. The use of this data is governed by our Privacy Policy, which can be found at `} <a href={`/#0#/about/privacy-policy`.replace('#0#', params.lang)}>{t`Privacy policy`}</a></p>
      <h2 className='text-secondary'>{t`4. Governing Law`}</h2>
      <p>{t`These Terms shall be governed and construed in accordance with the laws of the United States of America, without regard to its conflict of law provisions.`}</p>
      <h2 className='text-secondary'>{t`5. Changes to Terms`}</h2>
      <p>{t`#0# reserves the right, at our sole discretion, to modify or replace these Terms at any time. We will notify users of any changes by email. Your continued use of the Website after any change in these Terms will constitute your acceptance of such changes.`.replace('#0#', i18n._(siteConfig.name))}</p>
      <h2 className='text-secondary'>{t`6. Contact Information`}</h2>
      <p>{t`If you have any questions about these Terms, please contact us at #0#.`.replace('#0#', siteConfig.email)}</p>
      <p>{t`By using #0#, you signify your acceptance of these Terms of Service.`.replace('#0#', i18n._(siteConfig.name))}</p>
    </div>
  )
}
