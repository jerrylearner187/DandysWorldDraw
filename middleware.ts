import { NextRequest, NextResponse } from 'next/server'
import { DEFAULT_LOCALE, locales } from '@/framework/locale/locale'
import authConfig from '@/config/auth-config'

// 明确指定使用 Edge Runtime
export const runtime = 'experimental-edge'

import NextAuth from 'next-auth'
import createMiddleware from 'next-intl/middleware';

// 导入国际化中间件
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'as-needed', // 根据需要添加语言前缀
});

const ADMIN_INCLUDE_PATHS = ['/admin', '/plan-admin']

function isIncludes(originUrl: string) {
  return ADMIN_INCLUDE_PATHS.some((it) => originUrl.includes(it))
}
// const { auth } = NextAuth(authConfig)
// export default auth(async function middleware(request: NextRequest) {
//   // Your custom middleware logic goes here
//   console.info('Middleware called', { url: request.url, method: request.method })
//   // const url = request.nextUrl.clone();
//   //
//   // // Step 1: 处理 `/zh-TW/` 到 `/tw/` 的重定向逻辑
//   // console.log('middleware', url.pathname);
//   // if (url.pathname.startsWith('/zh-TW/')) {
//   //   url.pathname = url.pathname.replace('/zh-TW/','/tw/');
//   //   return NextResponse.redirect(url); // 执行重定向
//   // }
//   //
//   // // Step 2: 处理国际化逻辑
//   // const intlResponse = intlMiddleware(request);
//   // if (intlResponse) {
//   //   return intlResponse; // 如果国际化中间件返回响应，直接返回
//   // }
//   // //  自动跳转到对应的语言页面
//   // const nextUrl = (request as unknown as NextRequest).nextUrl
//   // const pathname = nextUrl.pathname
//   // const params = nextUrl.searchParams
//   // const pathnameIsMissingLocale = locales.every(
//   //   (locale) =>
//   //     !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
//   // )
//   // // Redirect if there is no locale
//   // if (pathnameIsMissingLocale) {
//   //   // e.g. incoming request is /products
//   //   // The new URL is now /en-US/products
//   //   // return NextResponse.redirect(
//   //   //   new URL(
//   //   //     `/${DEFAULT_LOCALE}/${pathname}?${params.toString()}`,
//   //   //     request.url
//   //   //   )
//   //   // )
//   // }
//   return NextResponse.next()
// })

export default async function middleware(request: NextRequest) {
  // Your custom middleware logic goes here
  console.info('Middleware called', { url: request.url, method: request.method })
  const url = request.nextUrl.clone();

  // Step 1: 处理 `/zh-TW/` 到 `/tw/` 的重定向逻辑
  console.log('middleware', url.pathname);
  if (url.pathname.startsWith('/zh-TW/')) {
    url.pathname = url.pathname.replace('/zh-TW/','/tw/');
    return NextResponse.redirect(url); // 执行重定向
  }

  // Step 2: 处理国际化逻辑
  const intlResponse = intlMiddleware(request);
  if (intlResponse) {
    return intlResponse; // 如果国际化中间件返回响应，直接返回
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ]
}
