'use client'
import { AVAILABLE_LOCALES } from '@/framework/locale/locale'
import { t } from '@lingui/macro'
import Link from 'next/link'
import { Post } from 'contentlayer/generated'
import { formatDate } from '@/utils'

export default  function BlogsPage({
  params,
  blogs
}: {
  blogs:Post[]
  params: { lang: AVAILABLE_LOCALES }
}) {
  // 只取最近的5篇文章
  // 7) Sort the blogs by createdAt in descending order

  return (
    <section id="blog" className=" mx-auto py-14">
      <div className="container md:px-4 mx-auto">
        <div className="grid grid-cols-1 max-w-7xl mx-auto text-center">
          <div className="mb-2">
            <h2 className="font-bold text-3xl md:text-[45px] leading-none mb-6 text-secondary">
              {t`Blogs`}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 justify-between max-w-7xl mx-auto">
            {blogs.map((blog: any) => (
              <Link
                className="bg-white/60"
                href={"/" + params.lang + '/blogs/' + blog.slug}
                passHref
                key={blog.slug}
              >
                <div className="py-2 flex justify-between align-middle gap-2">
                  <div className="flex-1 mx-2">
                    <h3 className="text-lg text-gray-900 font-bold hover:underline">{blog.title}</h3>
                    <p className="text-gray-500 hover:underline">{blog.description}</p>
                    {/* <p  className="hidden md:block  w-64  text-gray-400 text-sm mr-2">{t`Publish Date:`}{formatDate(blog.createdAt)}</p> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
      </div>
    </section>
  )
}
