import { t } from '@lingui/macro'
import { siteConfig, tdkConfig } from '@/config/site'
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
    const title = t`Privacy Policy` + ' | ' + i18n._(siteConfig.name)
    return {
        title,
        description: i18n._(tdkConfig.description),
        alternates: {
        canonical: params.lang != 'en' ? `${process.env.UE_WEB_API_URL}/${params.lang}/privacy-policy` : `${process.env.UE_WEB_API_URL}/privacy-policy` ,
        languages:metadataLanguages('/privacy-policy')
    },
    icons: {
        icon: siteConfig.icon,
    }
  }
}

export default async function PrivacyPage({
                                            params
                                          }: {
  params: { lang: AVAILABLE_LOCALES}
}) {
  await activateLocale(params.lang)
  return (
    <div className='prose mx-auto p-6 text-gray-500'>
      <h1 className='text-primary'>{t`Privacy Policy for #0#`.replace('#0#', i18n._(siteConfig.name))}</h1>
      <p>{t`This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service. If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy. The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.`}</p>
      <h2 className='text-secondary'>{t`1. Information Collection and Use`}</h2>
      <p>{t`For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information. The information that I request will be retained on your device and is not collected by me in any way. The app does use third-party services that may collect information used to identify you.`}</p>
      <h2 className='text-secondary'>{t`2. Log Data`}</h2>
      <p>{t`I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol ('IP') address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.`}</p>
      <h2 className='text-secondary'>{t`3. Cookies`}</h2>
      <p>{t`Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory. This Service does not use these cookies explicitly. However, the app may use third party code and libraries that use cookies to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.`}</p>
      <h2 className='text-secondary'>{t`4. Service Providers`}</h2>
      <p>{t`I may employ third-party companies and individuals due to the following reasons:`}</p>
      <ul>
        <li>{t`To facilitate our Service;`}</li>
        <li>{t`To provide the Service on our behalf;`}</li>
        <li>{t`To perform Service-related services;`}</li>
        <li>{t`To assist us in analyzing how our Service is used;`}</li>
      </ul>
      <p>{t`I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.`}</p>
      <h2 className='text-secondary'>{t`5. Security`}</h2>
      <p>{t`I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.`}</p>
      <h2 className='text-secondary'>{t`6. Links to Other Sites`}</h2>
      <p>{t`This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.`}</p>
      <h2 className='text-secondary'>{t`7. Changes to This Privacy Policy`}</h2>
      <p>{t`I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.`}</p>
    </div>
  )
}
