import { type MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import localeNames from '@/framework/locale/localeConfig'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapRoutes: MetadataRoute.Sitemap = [
    {
      url: '', // home
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'generator', // home
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'slot-maker', // home
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'randomizer', // home
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'blogs', // home
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    }
    // {
    //   url: 'submit',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: 'startup',
    //   lastModified: new Date(),
    //   changeFrequency: 'daily',
    //   priority: 0.8,
    // },11
  ];

  const BASE_URL = siteConfig.url;
  const names = localeNames as Record<string, any>
  const sitemapData = sitemapRoutes.flatMap((route) =>
    Object.keys(names).map((locale: any) => {
      const lang = locale === 'en' ? '' : `/${locale}`;
      const routeUrl = route.url === '' ? '' : `/${route.url}`;
      return {
        ...route,
        url: `${BASE_URL}${lang}${routeUrl}`,
      };
    }),
  );

  // const { rows: list } = await query('select url_key from product_detail', []);
  // list.forEach((item) => {
  //   const urls = localeNames.map((locale: any) => {
  //     const lang = locale === 'en' ? '' : `/${locale}`;
  //     const routeUrl = item.url_key === '' ? '' : `/${item.url_key}`;
  //     return {
  //       lastModified: new Date(),
  //       changeFrequency: 'daily',
  //       priority: 1,
  //       url: `${BASE_URL}${lang}/p${routeUrl}`,
  //     };
  //   });
  //   // @ts-ignore
  //   sitemapData.push(...urls);
  // });

  return sitemapData;
}
