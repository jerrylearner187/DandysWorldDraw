import { t } from '@lingui/macro'
import { i18n } from '@lingui/core'
import React from 'react'

type FAQItem = {
  question: any
  answer: any
}


const FaqItem = ({ faq }: { faq: FAQItem }) => (
  <div className="bg-white/60 mb-[4px]">
    <h3 className="p-4 lg:p-6 mb-0 w-full text-start flex justify-between items-center text-2xl font-semibold text-gray-900">
      <span>{i18n._(faq.question)}</span>
    </h3>
    <div className="px-3 lg:px-6 pb-2 lg:pb-6 text-gray-500">
      <p className="opacity-50">{i18n._(faq.answer)}</p>
    </div>
  </div>
)


const FAQs= ({ items }: { items: FAQItem[] }) => {

  return (
    <section id="faqs" className=" mx-auto py-14">
      <div className="container md:px-4 mx-auto">
        <div className="grid grid-cols-12 max-w-7xl mx-auto text-center md:text-left">
          <div className="col-span-12 lg:col-span-8 mb-2">
            <h2 className="font-bold text-3xl md:text-[45px] leading-none mb-6 text-secondary">
              {t`Frequently Asked Questions`}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 justify-between max-w-7xl mx-auto">
          {/*<div className="hidden md:block  col-span-12 md:col-span-4 mb-6 md:mb-0">*/}
          {/*  <div*/}
          {/*    className="bg-center bg-no-repeat bg-cover min-h-[150px] w-full rounded-2xl h-full"*/}
          {/*    style={{*/}
          {/*      backgroundImage:*/}
          {/*        'url(https://public-image.fafafa.ai/fa-image/2024/05/7258f277dfa7c92eb74c196f08e87ca8.jpg)'*/}
          {/*    }}*/}
          {/*  ></div>*/}
          {/*</div>*/}
          <div className="col-span-12">
            {items.map((faq, i) => (
              <FaqItem faq={faq} key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQs