import React from 'react'
import { activateLocale, AVAILABLE_LOCALES, metadataLanguages } from '@/framework/locale/locale'
import { Metadata } from 'next'
import { slotMakerTipConfig, slotMakerFaqConfig } from '@/config/site'
import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import Tips from '@/components/wegic/tips'
import FAQs from '@/components/wegic/faqs'
import { SlotMachine } from '@/components/SlotMachine'

export const runtime = 'edge';


export async function generateMetadata({
                                         params
                                       }: {
                                         params: { slug: string, lang: AVAILABLE_LOCALES}
                                       }
): Promise<Metadata> {
  // 必须主动激活一下当前语言，否则t函数不生效
  await activateLocale(params.lang)
  const title = t`Dandys World Draw Slot Maker | Create Random Dandy Stories`
  return {
    title,
    description: t`Spin the Dandys World Draw Slot Maker to generate unique story combinations featuring Dandy characters. A fun slot machine experience with cartoon heroes.`,
    alternates: {
      canonical: params.lang != 'en' ? `${process.env.UE_WEB_API_URL}/${params.lang}/slot-maker/` : `${process.env.UE_WEB_API_URL}/slot-maker/` ,
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
                {t`Dandys World Draw Slot Maker`}
              </h1>
              <h2 className="text-2xl text-gray-500">
                {t`Create Random Dandy Stories!`}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 p-10">
            <SlotMachine />
          </div>
        </div>
      </div>
    </section>
    <Tips data={slotMakerTipConfig} />
    <FAQs items={slotMakerFaqConfig} />
 </>
}
