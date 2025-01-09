import React from 'react'
import { activateLocale, AVAILABLE_LOCALES, metadataLanguages } from '@/framework/locale/locale'
import { Metadata } from 'next'
import { randomizerTipConfig, randomizerFaqConfig } from '@/config/site'
import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import Tips from '@/components/wegic/tips'
import FAQs from '@/components/wegic/faqs'
import { RandomizerMachine } from '@/components/RandomizerMachine'

export const runtime = 'edge';


export async function generateMetadata({
                                         params
                                       }: {
                                         params: { slug: string, lang: AVAILABLE_LOCALES}
                                       }
): Promise<Metadata> {
  // 必须主动激活一下当前语言，否则t函数不生效
  await activateLocale(params.lang)
  const title = t`Dandy's World Draw Randomizer | Creative Character Item Generator`
  return {
    title,
    description: t`Discover a fun interactive randomizer featuring Dandy, Pebble, Flutter & more characters. Perfect for creative drawing sessions and storytelling inspiration.`,
    alternates: {
      canonical: params.lang != 'en' ? `${process.env.UE_WEB_API_URL}/${params.lang}/randomizer/` : `${process.env.UE_WEB_API_URL}/randomizer/` ,
      languages:metadataLanguages('/')
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
                {t`Dandy's World Draw Randomizer`}
              </h1>
              <h2 className="text-2xl text-gray-500">
                {t`Creative Character Props Generator!`}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 p-10">
            <RandomizerMachine />
          </div>
        </div>
      </div>
    </section>
    <Tips data={randomizerTipConfig} />
    <FAQs items={randomizerFaqConfig} />
 </>
}
