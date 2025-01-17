import { activateLocale, AVAILABLE_LOCALES, metadataLanguages } from '@/framework/locale/locale'
import { notFound } from 'next/navigation'
import { CustomMarkdown } from '@/framework/blogs/CustomMarkdown'
import Link from 'next/link'
import { t } from '@lingui/macro'
import { Metadata } from 'next'
import { allPosts } from 'contentlayer/generated'
import { FaChevronLeft } from 'react-icons/fa6'
export const runtime = 'edge';

// 获取指定语言的博客文章
function getLocalizedPosts(locale: AVAILABLE_LOCALES) {
  return allPosts.filter(post => post.locale === locale)
}

// 动态生成metadata
export async function generateMetadata({
  params
}: {
  params: { slug: string, lang: AVAILABLE_LOCALES }
}): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug)
  const posts = getLocalizedPosts(params.lang || AVAILABLE_LOCALES.en)
  const post = posts.find((post) => post.slug === slug)

  if (!post) {
    return {
      title: 'Post not found',
    }
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: params.lang != 'en' 
        ? `${process.env.UE_WEB_API_URL}/${params.lang}/blogs/${slug}` 
        : `${process.env.UE_WEB_API_URL}/blogs/${slug}`,
      languages: metadataLanguages(`/blogs/${slug}`)
    },
  }
}

export default async function Page({
  params
}: {
  params: { slug: string, lang: AVAILABLE_LOCALES }
}) {
  await activateLocale(params.lang)
  const slug = decodeURIComponent(params.slug)
  const posts = getLocalizedPosts(params.lang || AVAILABLE_LOCALES.en)
  const post = posts.find((post) => post.slug === slug)

  if (!post) {
    return notFound()
  }

  return (
    <>
      <article className="prose prose-sm md:prose-base lg:prose-lg rounded-2xl max-w-3xl mx-auto py-10 px-4 text-white/30">
        <Link href={`/${params.lang}/blogs`} className="mb-2 text-gray-500 flex items-center no-underline">
          <FaChevronLeft/>{t`Blogs List`}
        </Link>
        <CustomMarkdown code={post.body.html} />
      </article>
    </>
  )
}

// 生成静态路径
export async function generateStaticParams() {
  const paths: { lang: string; slug: string }[] = []
  
  Object.values(AVAILABLE_LOCALES).forEach(locale => {
    const localizedPosts = getLocalizedPosts(locale)
    localizedPosts.forEach(post => {
      paths.push({
        lang: locale,
        slug: post.slug
      })
    })
  })

  return paths
}
