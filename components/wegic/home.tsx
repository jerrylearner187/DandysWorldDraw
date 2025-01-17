import React from 'react'
import { activateLocale, AVAILABLE_LOCALES } from '@/framework/locale/locale'
import { i18n } from '@lingui/core'
import { aboutConfig, faqConfig, tipConfig } from '@/config/site'
import Features from '@/components/wegic/features'
import Tips from '@/components/wegic/tips'
import FAQs from '@/components/wegic/faqs'
import Hero from '@/components/wegic/hero'
import Blogs from '@/components/wegic/blogs'
import { allPosts, Post } from 'contentlayer/generated'

// 获取指定语言的博客文章
function getLocalizedPosts(locale: AVAILABLE_LOCALES) {
  return allPosts.filter(post => post.locale === locale)
}

export default async function Home({params,}: {
  params?: { lang: AVAILABLE_LOCALES }
}) {
  await activateLocale(params?.lang || AVAILABLE_LOCALES.en);
  let blogs = getLocalizedPosts(params?.lang || AVAILABLE_LOCALES.en)
  // 最新的5篇博客
  blogs.sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const newBlogs = blogs.slice(0, 5)
  return (
    <>
      <Hero params={params} />
      <section id="about" className="w-full px-0 py-2 md:px-8 md:py-10 mx-auto text-center bg-gradient-romantic">
        <h2
          className="font-bold text-3xl md:text-[45px] leading-none mb-6 mt-8 text-white">{i18n._(aboutConfig.title)}</h2>
        <p className="text-left indent-16 w-full md:w-4/5 mx-auto mb-8 text-xl text-white/90">
          {i18n._(aboutConfig.description)}
        </p>
      </section>
      <Features />
      <Tips data={tipConfig} />
      {/*<Gallery />*/}
      <FAQs items={faqConfig} />
      {/*<Divider className="bg-gray" />*/}
      {/*  <Pricing />*/}
      <Blogs params={{ lang: params!.lang }} blogs={newBlogs} />
      {/*  <IndexUploader params={params!}/>*/}
    </>
  )
}