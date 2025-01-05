import React from 'react'
import { howtoConfig } from '@/config/site'
import { i18n } from '@lingui/core'

type FeatureItem = {
  img: string
  instruction: any
  description: any
  type: string
  step: string
}

const FeatureItem = ({ item, index }: { item: FeatureItem, index: number }) => (
  <div className="bg-white/60 flex-grow p-10 round-[20px]">
    <div className={`flex flex-col items-center justify-between text-center md:flex-row
    ${index % 2 == 0 ? '' : 'md:flex-row-reverse'}`}>
      {item.type == 'video' ?
        <iframe id="game" width="100%" height="100%"
                className="w-full min-h-[315px] md:w-1/2 bg-gray-50 shadow-xl rounded-xl object-cover"
                frameBorder="0" scrolling="no" allowFullScreen={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                src={item.img}></iframe> : <img
          src={item.img}
          className="w-full md:w-1/2 bg-gray-50 shadow-xl rounded-xl object-cover
        transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:opacity-90 hover:rotate-2"
          alt={i18n._(item.instruction)}
        />
      }

      <div className="flex flex-col items-start px-2">
        <h3 className="mt-4 text-2xl font-semibold text-gray-900">{i18n._(item.instruction)}</h3>
        <p className="mt-2 text-md text-gray-500 max-w-[500px] text-left">
          {i18n._(item.description)}
        </p>
      </div>
    </div>
  </div>
)

export default function Component() {
  return (
    <section id="features" className="flex justify-center py-14 mx-auto">
      <div className="container md:px-4 mx-auto">
        <div className="max-w-7xl mx-auto space-y-10 columns-1">
          <div className="grid mx-auto text-center md:text-left">
            <div className="col-span-12 lg:col-span-8 mb-2">
              <h2 className="font-bold text-3xl md:text-[45px] leading-none text-secondary">
                {i18n._(howtoConfig.title)}
              </h2>
            </div>
          </div>
          {
            howtoConfig.steps.map((item, i) => (
                <FeatureItem item={item} key={i} index={i} />
              )
            )
          }
        </div>
      </div>
    </section>
  )
}
