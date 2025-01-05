import { useMemo } from 'react'
import { locales } from '@/framework/locale/locale'

export default function useNavigation(pathname: string): [string, (href: string) => boolean] {
  const pathWithOutLocale = useMemo(() => {
    // 提取第一个路径，看是否为语言代码
    const regex = /^\/([^\/]*)\//;
    const match = pathname.match(regex);
    if (match) {
      const locale = match[1];
      if (locales.includes(locale)) {
        return `${pathname.replace(regex, '/')}`
      }
    }
    return pathname
  }, [pathname]);

  function isActive(href: string): boolean {
    if (pathWithOutLocale === '/' && (href === '' || href === '/')) {
      return true
    }
    console.log('isActive ', {pathWithOutLocale, href})
    return pathWithOutLocale.startsWith(href) && href !== '/'
  }

  return [pathWithOutLocale, isActive]
}