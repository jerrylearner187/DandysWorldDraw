import React from 'react'
import DynamicFaIcon from '@/framework/components/DynamicFaIcon'
import { i18n } from '@lingui/core'

type FeatureItem = {
  img: string
  tip: any
  description: any
}

type TipItem = {
  title: any
  tips: FeatureItem[]
}

const FeatureItem = ({ item }: { item: FeatureItem }) => (
    <div className="bg-white/60 rounded-lg shadow-md p-4 flex flex-col items-center justify-center
    transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:opacity-90">
      <DynamicFaIcon iconName={item.img} className="w-[50px] h-[50px]"/>
      <div className="flex flex-col items-start">
        <h3 className="mt-4 text-2xl font-semibold w-full text-center text-gray-900">{i18n._(item.tip)}</h3>
        <p className="mt-2 text-md text-gray-500 max-w-[500px] text-center">
          {i18n._(item.description)}
        </p>
      </div>
    </div>
)

const Tips= ({ data }: { data: TipItem }) =>  {
  return (
    <section id="tips" className="flex justify-center py-14 mx-auto">
      <div className="container md:px-4 mx-auto">
        <div className="max-w-7xl mx-auto space-y-10 columns-1">
          <div className="grid mx-auto text-center md:text-left">
            <div className="col-span-12 lg:col-span-8 mb-2">
              <h2 className="font-bold text-3xl md:text-[45px] leading-none text-secondary">
                {i18n._(data.title)}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-10 round-[20px]">
            {
              data.tips.map((item, i) => (
                  <FeatureItem item={item} key={i} />
                )
              )
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tips;