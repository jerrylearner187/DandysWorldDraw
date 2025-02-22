import { useMemo } from 'react'
import { locales } from '@/framework/locale/locale'

export default function useNavigation(pathname: string): [string, (href: string) => boolean] {
  const pathWithOutLocale = useMemo(() => {
    // 提取第一个路径段，检查是否为语言代码
    const regex = /^\/([^\/]*)(\/|$)/;
    const match = pathname.match(regex);
    if (match) {
      const locale = match[1];
      if (locales.includes(locale)) {
        // 如果路径仅包含语言代码 (如 /ko)，返回 /
        if (pathname === `/${locale}`) {
          return '/';
        }
        // 否则移除语言代码部分 (如 /ko/reroll -> /reroll)
        return pathname.replace(regex, '/');
      }
    }
    return pathname;
  }, [pathname]);

  function isActive(href: string): boolean {
    if (pathWithOutLocale === '/' && (href === '' || href === '/')) {
      return true
    }
    console.log('isActive ', {pathWithOutLocale, href})
    if (!href.endsWith('/')) {
      href += '/';
    }
    return pathWithOutLocale == href && href !== '/'
  }

  return [pathWithOutLocale, isActive]
}