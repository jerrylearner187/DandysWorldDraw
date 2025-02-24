import React from 'react'
import { activateLocale, AVAILABLE_LOCALES, metadataLanguages } from '@/framework/locale/locale'
import { Metadata } from 'next'
import { generatorTipConfig, generatorFaqConfig } from '@/config/site'
import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import DrawingBoard from '@/components/DrawingBoard'
import Tips from '@/components/wegic/tips'
import FAQs from '@/components/wegic/faqs'

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
                                         params: { lang: AVAILABLE_LOCALES}
                                       }
): Promise<Metadata> {
  // 必须主动激活一下当前语言，否则t函数不生效
  await activateLocale(params.lang)
  const title = t`Dandy's World Draw Generator | Learn Character Drawing Step by Step`
  return {
    title,
    description: t`Create your favorite Dandy's World characters with our easy-to-follow drawing generator. Perfect for beginners & advanced artists with step-by-step tutorials.`,
    alternates: {
      canonical: params.lang != 'en' ? `${process.env.UE_WEB_API_URL}/${params.lang}/generator` : `${process.env.UE_WEB_API_URL}/generator` ,
      languages:metadataLanguages('/generator')
    }
  }
}

export default async function Page({
                                     params
                                   }: {
  params?: { lang: AVAILABLE_LOCALES }
}) {
  console.log('home page', params);
  await activateLocale(params?.lang || AVAILABLE_LOCALES.en)
  return <>
  <section id="tips" className="flex justify-center py-14 mx-auto">
      <div className="container md:px-4 mx-auto">
        <div className="max-w-7xl mx-auto columns-1">
          <div className="grid mx-auto text-center">
            <div className="col-span-12 lg:col-span-8 mb-2">
              <h1 className="font-bold text-4xl md:text-[45px] leading-none text-primary">
                {t`Dandys World Draw Generator`}
              </h1>
              <h2 className="text-2xl text-gray-500">
                {t`Create your favorite Dandy's World characters now!`}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 p-10">
            <DrawingBoard />
          </div>
        </div>
      </div>
    </section>
    <Tips data={generatorTipConfig} />
    <FAQs items={generatorFaqConfig} />
 </>
}
