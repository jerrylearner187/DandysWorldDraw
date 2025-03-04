import React from 'react'
import { activateLocale, AVAILABLE_LOCALES } from '@/framework/locale/locale'
import { i18n } from '@lingui/core'
import { heroConfig } from '@/config/site'
import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6"
import { t } from "@lingui/macro"

export default async function Hero({params,}: {
  params?: { lang: AVAILABLE_LOCALES }
}) {
  await activateLocale(params?.lang || AVAILABLE_LOCALES.en);
  return (
    <section className="relative px-6 py-24 md:px-8 md:py-10 w-full">
       {/*<GoogleLogin ref={loginRef} />*/}
      <div className="w-full max-w-7xl mx-auto h-full flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-2/3 h-full flex flex-col md:flex-row justify-around min-h-[300px] md:gap-4 md:h-[600px]">
          <div
            className="h-fit w-full flex-col mx-auto flex justify-between items-center md:h-[550px] md:flex-row bg-slate-50 dark:bg-slate-900">
            <iframe id="game" width="100%" height="100%" className="bg-slate-50 dark:bg-slate-900 min-h-[300px]"
                    frameBorder="0" scrolling="no" allowFullScreen={true}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    src="https://www.youtube.com/embed/e1kGp_tBqu4?si=m1Dox5mN2TBsYSX2&autoplay=1&mute=1"></iframe>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex flex-col gap-6 justify-between h-full">
          <h1
            className="text-4xl font-bold text-gray-900 border-4 border-transparent  dark:text-slate-50">
            {i18n._(heroConfig.title)}
          </h1>
          <h2
            className="text-gray-500 border-4 border-transparent dark:text-slate-400">
            {i18n._(heroConfig.description)}
          </h2>
          <div className="w-full flex justify-center p-4">
            <Link 
              href="/generator"
              className="inline-flex items-center px-8 py-3 text-lg font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">{t`Generate Now!`}</span>
              <FaArrowRightLong className="inline-block" />
            </Link>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[100px] md:rounded-br-[100px] bg-slate-50 dark:bg-slate-900 pointer-events-none -z-10"></div>
    </section>
  )
}