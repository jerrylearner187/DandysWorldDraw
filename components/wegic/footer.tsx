     1|import Link from 'next/link'
     2|import I18nLink from '@/framework/locale/i18n-link'
     3|import React from 'react'
     4|import { AVAILABLE_LOCALES } from '@/framework/locale/locale'
     5|import { msg, t } from '@lingui/macro'
     6|import { siteConfig, tdkConfig } from '@/config/site'
     7|import { i18n } from '@lingui/core'
     8|
     9|const getNavigation = () => {
    10|  return [
    11|    // { name: t`Home`, href: '/' },
    12|    // { name: t`Pricing`, href: '/pricing' },
    13|    { name: msg`Blogs`, href: '/blogs' },
    14|    /* { name: t`Explore`, href: '/user-case' }*/
    15|  ]
    16|}
    17|
    18|const Footer = ({ params }: { params?: { lang: AVAILABLE_LOCALES } }) => {
    19|  // useEffect(() => {
    20|  //   console.log('footer locale:', params?.lang);
    21|  //   activateLocale(params?.lang as AVAILABLE_LOCALES).then(() => {
    22|  //   });
    23|  // }, [params?.lang]);
    24|  return (
    25|    <>
    26|      <footer className="md:pt-22 pt-10 mt-8 bg-white/90 px-4 md:px-0">
    27|        <div className="text-gray-500 w-full max-w-7xl mx-auto  items-center gap-16 md:grid-cols-2 md:gap-24">
    28|          <div className="flex flex-wrap gap-y-10 items-center justify-between">
    29|            <div className="space-y-4">
    30|              <Link href="/" className="inline-block">
    31|                <div className="w-full h-full flex items-center justify-start">
    32|                  <img
    33|                    className="w-auto h-10 object-cover"
    34|                    src="/logo.png"
    35|                    alt="logo"
    36|                  />
    37|                </div>
    38|              </Link>
    39|              <h2 className="text-gray-300 text-lg font-semibold sm:text-2xl">
    40|                {i18n._(tdkConfig.title)}
    41|              </h2>
    42|              {/*<p className="max-2xl">*/}
    43|              {/*  {t`Create Awesome Chromakopia Avatar`}*/}
    44|              {/*</p>*/}
    45|              <div className="pt-2 flex items-center gap-x-6 text-gray-400">
    46|              <a href="https://startupfa.me/s/dandys-world-draw?utm_source=dandysworlddraw.com" target="_blank"><img src="https://startupfa.me/badges/featured-badge-small.webp" alt="Featured on Startup Fame" width="224" height="36" /></a>
    47|              <a href="https://www.producthunt.com/posts/dandys-world-draw?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-dandys&#0045;world&#0045;draw" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=959634&theme=light&t=1746018803149" alt="Dandys&#0032;World&#0032;Draw - Learn&#0032;to&#0032;draw&#0032;dandy&#0039;s&#0032;world&#0032;characters | Product Hunt" style={{ width: "250px", height: "54px;" }} width="250" height="54" /></a>
    48|                {/*<Link href={`/${params?.lang}/ai-image-extender`}>*/}
    49|                {/*  AI Image Extender*/}
    50|                {/*</Link>*/}
    51|                {/*<Link href={`/${params?.lang}/ai-photo-extender`} >*/}
    52|                {/*  AI Photo Extender*/}
    53|                {/*</Link>*/}
    54|                {/*<Link href={`/${params?.lang}/generative-fill-ai`} >*/}
    55|                {/*  Generative Fill AI*/}
    56|                {/*</Link>*/}
    57|                {/*<a href="https://x.com/golforbit" target="_blank" aria-label="Social media">*/}
    58|                {/*  <FaXTwitter />*/}
    59|                {/*</a>*/}
    60|                {/*<a href="https://www.youtube.com/@GolfOrbit-z8w" target="_blank" aria-label="Social media">*/}
    61|                {/*  <FaYoutube />*/}
    62|                {/*</a>*/}
    63|                {/*<a href="https://github.com/golforbitsupport" target="_blank" aria-label="Social media">*/}
    64|                {/*  <FaGithub />*/}
    65|                {/*</a>*/}
    66|                {/*<a href="/" target="_blank" aria-label="Social media">
    67|              <svg
    68|                className="w-6 h-6 hover:text-gray-500 duration-150"
    69|                fill="none"
    70|                viewBox="0 0 28 28"
    71|              >
    72|                <g clipPath="url(#clip0_1274_2978)">
    73|                  <path
    74|                    fill="currentColor"
    75|                    d="M25.927 0H2.067C.924 0 0 .902 0 2.018v23.959C0 27.092.924 28 2.067 28h23.86C27.07 28 28 27.092 28 25.982V2.018C28 .902 27.07 0 25.927 0zM8.307 23.86H4.151V10.495h4.156V23.86zM6.229 8.673a2.407 2.407 0 110-4.812 2.406 2.406 0 010 4.812zM23.86 23.86h-4.15v-6.497c0-1.547-.028-3.543-2.16-3.543-2.16 0-2.49 1.69-2.49 3.434v6.606h-4.144V10.495h3.98v1.826h.056c.552-1.05 1.908-2.16 3.926-2.16 4.206 0 4.982 2.767 4.982 6.366v7.333z"
    76|                  />
    77|                </g>
    78|                <defs>
    79|                  <clipPath id="clip0_1274_2978">
    80|                    <path fill="#fff" d="M0 0h28v28H0z" />
    81|                  </clipPath>
    82|                </defs>
    83|              </svg>
    84|            </a>*/}
    85|              </div>
    86|            </div>
    87|          </div>
    88|          <div></div>
    89|          <div className="mt-8">
    90|            <I18nLink params={params} />
    91|          </div>
    92|          <div className="mt-2 py-10 border-t flex-row-reverse items-center justify-between sm:flex">
    93|            <div className="flex justify-center items-center">
    94|              <a href={`${params?.lang !== 'en' ? `/${params?.lang}` : ''}/about/privacy-policy`} className="mr-5">{t`Privacy policy`}</a>
    95|              <a href={`${params?.lang !== 'en' ? `/${params?.lang}` : ''}/about/terms-of-service`}>{t`Terms of service`}</a>
    96|            </div>
    97|            <ul className="flex flex-wrap items-center gap-4 sm:text-sm">
    98|              {getNavigation().map((item, idx) => (
    99|               <li
   100|                  key={idx}
   101|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
   102|                >
   103|                 <Link href={`/${params?.lang}${item.href}`}>{i18n._(item.name)}</Link>
   104|                </li>
   105|              ))}
   106|              <li>
   107|                <a
   108|                  href="https://earth-zoom-out.org"
   109|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
   110|                  title="Earth Zoom Out"
   111|                >
   112|                  Earth Zoom Out
   113|                </a>
   114|              </li>
   115|                            <li>
   116|                <a
   117|                  href="https://aisquidgame.com"
   118|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
   119|                  title="AI Squid Game"
   120|                >
   121|                  AI Squid Game
   122|                </a>
   123|              </li>
   124|                              <li>
   125|                <a
   126|                  href="https://crazycattle3dgame.net"
   127|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
   128|                  title="Crazy Cattle 3D"
   129|                >
   130|                  Crazy Cattle 3D
   131|                </a>
   132|              </li>
   133|                          <li>
   134|                <a
   135|                  href="https://ai-doll-generator.net"
   136|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
   137|                  title="AI Doll Generator"
   138|                >
   139|                  AI Doll Generator
   140|                </a>
   141|              </li>
   142|              <li>
   143|                <a
   144|                  href="https://brainrotwords.net"
   145|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
   146|                  title="Brainrot Words"
   147|                >
   148|                  Brainrot Words
   149|                </a>
   150|              </li>
   151|              <li>
   152|                <a
   153|                  href="https://duck-duck-clicker.com"
   154|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
   155|                  title="Duck Duck Clicker"
   156|                >
   157|                  Duck Duck Clicker
   158|                </a>
   159|              </li>
   160|              <li>
   161|                <a
   162|                  href="https://brickrodfisch.com"
   163|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
   164|                  title="Brick Rod Fisch"
   165|                >
   166|                  Brick Rod Fisch
   167|                </a>
   168|              </li>
   169|                                          <li>
   170|                <a
   171|                  href="https://changehaircolor.net"
   172|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
   173|                  title="Change Hair Color"
   174|                >
   175|                  Change Hair Color
   176|                </a>
   177|              </li>
   178|              <li>
   179|                <a
   180|                  href="https://text-behind-image.net"
   181|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
   182|                  title="Text Behind Image"
   183|                >
   184|                  Text Behind Image
   185|                </a>
   186|              </li>
   187|              <li>
   188|                <a
   189|                  href="https://squid-game.run"
   190|                  target="_blank"
   191|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
   192|                  title="Squid Game"
   193|                >
   194|                  Squid Game
   195|                </a>
   196|              </li>
   197|              <li>
   198|                <a
   199|                  href="https://aistage.net"
   200|                  target="_blank"
   201|                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
   202|                  title="AIStage"
   203|                >
   204|                  AIStage
   205|                </a>
   206|              </li>
            <li>
                <a
                  href="https://omogle.net"
                  className="font-medium text-gray-500 hover:text-primary-200 duration-150"
                  title="Omogle - Free AI Face Rating"
                >
                  Omogle
                </a>
              </li>
   207|            </ul>
   208|            <p className="mt-6 sm:mt-0">
   209|              © {new Date().getFullYear()} {i18n._(siteConfig.name)} All rights reserved.
   210|            </p>
   211|          </div>
   212|        </div>
   213|      </footer>
   214|    </>
   215|  )
   216|}
   217|
   218|export default Footer
