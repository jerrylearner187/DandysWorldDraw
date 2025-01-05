import React from 'react'
import { activateLocale, AVAILABLE_LOCALES, metadataLanguages } from '@/framework/locale/locale'
import { Metadata } from 'next'
import { siteConfig, tdkConfig } from '@/config/site'
import { i18n } from '@lingui/core'
import Home from '@/components/wegic/home'

export const runtime = 'edge';


export async function generateMetadata({
                                         params
                                       }: {
                                         params: { slug: string, lang: AVAILABLE_LOCALES}
                                       }
): Promise<Metadata> {
  // 必须主动激活一下当前语言，否则t函数不生效
  await activateLocale(params.lang)
  const title = i18n._(tdkConfig.title) + ` | ` + i18n._(siteConfig.name)
  return {
    title,
    description: i18n._(tdkConfig.description),
    alternates: {
      canonical: params.lang != 'en' ? `${process.env.UE_WEB_API_URL}/${params.lang}` : `${process.env.UE_WEB_API_URL}/` ,
      languages:metadataLanguages('/')
    },
    icons: {
      icon: siteConfig.icon,
    }
  }
}

export async function generateStaticParams() {
  // 构建时生成静态页面
  const allLang = []
  for (const langDir of Object.values(AVAILABLE_LOCALES)) {
    allLang.push({ lang: langDir })
  }
  return allLang
}

export default async function Page({
                                     params
                                   }: {
  params?: { lang: AVAILABLE_LOCALES }
}) {
  console.log('home page', params);
  await activateLocale(params?.lang || AVAILABLE_LOCALES.en)
  // 编译期间获取blog数据，避免运行时去调用getBlogPosts方法，导致无法读取blogs目录下的文件
  // let blogs = getBlogPosts().filter((post) => post.lang===params?.lang)
  // 最新的5篇博客
  // blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  // const newBlogs = blogs.slice(0, 5)
  return <Home params={params} />
}
