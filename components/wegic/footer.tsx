import Link from 'next/link'
import I18nLink from '@/framework/locale/i18n-link'
import React from 'react'
import { AVAILABLE_LOCALES } from '@/framework/locale/locale'
import { msg, t } from '@lingui/macro'
import { siteConfig, tdkConfig } from '@/config/site'
import { i18n } from '@lingui/core'

const getNavigation = () => {
  return [
    // { name: t`Home`, href: '/' },
    // { name: t`Pricing`, href: '/pricing' },
    { name: msg`Blogs`, href: '/blogs' },
    /* { name: t`Explore`, href: '/user-case' }*/
  ]
}

const Footer = ({ params }: { params?: { lang: AVAILABLE_LOCALES } }) => {
  // useEffect(() => {
  //   console.log('footer locale:', params?.lang);
  //   activateLocale(params?.lang as AVAILABLE_LOCALES).then(() => {
  //   });
  // }, [params?.lang]);
  return (
    <>
      <footer className="md:pt-22 pt-10 mt-8 bg-white/90 px-4 md:px-0">
        <div className="text-gray-500 w-full max-w-7xl mx-auto  items-center gap-16 md:grid-cols-2 md:gap-24">
          <div className="flex flex-wrap gap-y-10 items-center justify-between">
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <div className="w-full h-full flex items-center justify-start">
                  <img
                    className="w-auto h-10 object-cover"
                    src="/logo.png"
                    alt="logo"
                  />
                </div>
              </Link>
              <h2 className="text-gray-300 text-lg font-semibold sm:text-2xl">
                {i18n._(tdkConfig.title)}
              </h2>
              {/*<p className="max-2xl">*/}
              {/*  {t`Create Awesome Chromakopia Avatar`}*/}
              {/*</p>*/}
              <div className="pt-2 flex items-center gap-x-6 text-gray-400">
              <a href="https://startupfa.me/s/dandys-world-draw?utm_source=dandysworlddraw.com" target="_blank"><img src="https://startupfa.me/badges/featured-badge-small.webp" alt="Featured on Startup Fame" width="224" height="36" /></a>
              <a href="https://www.producthunt.com/posts/dandys-world-draw?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-dandys&#0045;world&#0045;draw" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=959634&theme=light&t=1746018803149" alt="Dandys&#0032;World&#0032;Draw - Learn&#0032;to&#0032;draw&#0032;dandy&#0039;s&#0032;world&#0032;characters | Product Hunt" style={{ width: "250px", height: "54px;" }} width="250" height="54" /></a>
                {/*<Link href={`/${params?.lang}/ai-image-extender`}>*/}
                {/*  AI Image Extender*/}
                {/*</Link>*/}
                {/*<Link href={`/${params?.lang}/ai-photo-extender`} >*/}
                {/*  AI Photo Extender*/}
                {/*</Link>*/}
                {/*<Link href={`/${params?.lang}/generative-fill-ai`} >*/}
                {/*  Generative Fill AI*/}
                {/*</Link>*/}
                {/*<a href="https://x.com/golforbit" target="_blank" aria-label="Social media">*/}
                {/*  <FaXTwitter />*/}
                {/*</a>*/}
                {/*<a href="https://www.youtube.com/@GolfOrbit-z8w" target="_blank" aria-label="Social media">*/}
                {/*  <FaYoutube />*/}
                {/*</a>*/}
                {/*<a href="https://github.com/golforbitsupport" target="_blank" aria-label="Social media">*/}
                {/*  <FaGithub />*/}
                {/*</a>*/}
                {/*<a href="/" target="_blank" aria-label="Social media">
              <svg
                className="w-6 h-6 hover:text-gray-500 duration-150"
                fill="none"
                viewBox="0 0 28 28"
              >
                <g clipPath="url(#clip0_1274_2978)">
                  <path
                    fill="currentColor"
                    d="M25.927 0H2.067C.924 0 0 .902 0 2.018v23.959C0 27.092.924 28 2.067 28h23.86C27.07 28 28 27.092 28 25.982V2.018C28 .902 27.07 0 25.927 0zM8.307 23.86H4.151V10.495h4.156V23.86zM6.229 8.673a2.407 2.407 0 110-4.812 2.406 2.406 0 010 4.812zM23.86 23.86h-4.15v-6.497c0-1.547-.028-3.543-2.16-3.543-2.16 0-2.49 1.69-2.49 3.434v6.606h-4.144V10.495h3.98v1.826h.056c.552-1.05 1.908-2.16 3.926-2.16 4.206 0 4.982 2.767 4.982 6.366v7.333z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1274_2978">
                    <path fill="#fff" d="M0 0h28v28H0z" />
                  </clipPath>
                </defs>
              </svg>
            </a>*/}
              </div>
            </div>
          </div>
          <div></div>
          <div className="mt-8">
            <I18nLink params={params} />
          </div>
          <div className="mt-2 py-10 border-t flex-row-reverse items-center justify-between sm:flex">
            <div className="flex justify-center items-center">
              <a href={`${params?.lang !== 'en' ? `/${params?.lang}` : ''}/about/privacy-policy`} className="mr-5">{t`Privacy policy`}</a>
              <a href={`${params?.lang !== 'en' ? `/${params?.lang}` : ''}/about/terms-of-service`}>{t`Terms of service`}</a>
            </div>
            <ul className="flex flex-wrap items-center gap-4 sm:text-sm">
              {getNavigation().map((item, idx) => (
               <li
                  key={idx}
                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
                >
                 <Link href={`/${params?.lang}${item.href}`}>{i18n._(item.name)}</Link>
                </li>
              ))}
                            <li>
                <a
                  href="https://aisquidgame.com"
                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
                  title="AI Squid Game"
                >
                  AI Squid Game
                </a>
              </li>
                              <li>
                <a
                  href="https://crazycattle3dgame.net"
                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
                  title="Crazy Cattle 3D"
                >
                  Crazy Cattle 3D
                </a>
              </li>
                          <li>
                <a
                  href="https://ai-doll-generator.net"
                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
                  title="AI Doll Generator"
                >
                  AI Doll Generator
                </a>
              </li>
              <li>
                <a
                  href="https://brainrotwords.net"
                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
                  title="Brainrot Words"
                >
                  Brainrot Words
                </a>
              </li>
              <li>
                <a
                  href="https://duck-duck-clicker.com"
                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
                  title="Duck Duck Clicker"
                >
                  Duck Duck Clicker
                </a>
              </li>
              <li>
                <a
                  href="https://brickrodfisch.com"
                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
                  title="Brick Rod Fisch"
                >
                  Brick Rod Fisch
                </a>
              </li>
                                          <li>
                <a
                  href="https://changehaircolor.net"
                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
                  title="Change Hair Color"
                >
                  Change Hair Color
                </a>
              </li>
              <li>
                <a
                  href="https://text-behind-image.net"
                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
                  title="Text Behind Image"
                >
                  Text Behind Image
                </a>
              </li>
              <li>
                <a
                  href="https://squid-game.run"
                  target="_blank"
                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
                  title="Squid Game"
                >
                  Squid Game
                </a>
              </li>
              <li>
                <a
                  href="https://aistage.net"
                  target="_blank"
                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
                  title="AIStage"
                >
                  AIStage
                </a>
              </li>
            </ul>
            <p className="mt-6 sm:mt-0">
              © {new Date().getFullYear()} {i18n._(siteConfig.name)} All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer