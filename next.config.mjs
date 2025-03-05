/** @type {import('next').NextConfig} */
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import { withContentlayer } from 'next-contentlayer';
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  optimizeFonts: true,
  experimental: {
    swcPlugins: [
      [
        '@lingui/swc-plugin', {}
      ]
    ]
  },
  trailingSlash: false,
  webpack: (config, { webpack }) => {
    config.module.rules.push({
      test: /\/translations\/.*\/.*\.json$/,
      use: {
        loader: '@lingui/loader'
      }
    })

    // 添加新的插件配置
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /canvas|jsdom/,
        contextRegExp: /konva/
      })
    )
    return config
  },
  redirects() {
    return [
      {
        source: '/zh-TW/',
        destination: '/tw/',
        permanent: true,
      },
      {
        source: '/:lang/blog',
        destination: '/:lang/blogs',
        permanent: true,
      },
      {
        source: '/de/blogs/wie-zeichnet-man-pebble-aus-dandys-world',
        destination: '/de/blogs/why-is-everyone-drawing-pebble-from-dandys-world',
        permanent: true,
      },
      {
        source: '/de/blogs/wie-zeichnet-man-shelly-aus-dandys-world',
        destination: '/de/blogs/why-is-everyone-drawing-shelly-from-dandys-world',
        permanent: true,
      },
      {
        source: '/de/blogs/warum-ist-rudie-aus-dandys-world-so-beliebt-und-wie-zeichnet-man-ihn',
        destination: '/de/blogs/why-is-everyone-talking-about-rudie-in-dandys-world',
        permanent: true,
      },
      {
        source: '/es/blogs/como-dibujar-a-pebble-de-dandys-world',
        destination: '/es/blogs/why-is-everyone-drawing-pebble-from-dandys-world',
        permanent: true,
      },
      {
        source: '/es/blogs/como-dibujar-a-shelly-de-dandys-world',
        destination: '/es/blogs/why-is-everyone-drawing-shelly-from-dandys-world',
        permanent: true,
      },
      {
        source: '/es/blogs/como-dibujar-a-rudie-de-dandys-world',
        destination: '/es/blogs/why-is-everyone-talking-about-rudie-in-dandys-world',
        permanent: true,
      },
      {
        source: '/fr/blogs/comment-dessiner-pebble-dandys-world',
        destination: '/fr/blogs/why-is-everyone-drawing-pebble-from-dandys-world',
        permanent: true,
      },
      {
        source: '/fr/blogs/comment-dessiner-shelly-dandys-world',
        destination: '/fr/blogs/why-is-everyone-drawing-shelly-from-dandys-world',
        permanent: true,
      },
      {
        source: '/fr/blogs/comment-dessiner-rudie-dandys-world',
        destination: '/fr/blogs/why-is-everyone-talking-about-rudie-in-dandys-world',
        permanent: true,
      },
      {
        source: '/it/blogs/come-disegnare-pebble-dandys-world',
        destination: '/it/blogs/why-is-everyone-drawing-pebble-from-dandys-world',
        permanent: true,
      },
      {
        source: '/it/blogs/come-disegnare-shelly-dandys-world',
        destination: '/it/blogs/why-is-everyone-drawing-shelly-from-dandys-world',
        permanent: true,
      },
      {
        source: '/it/blogs/come-disegnare-rudie-dandys-world',
        destination: '/it/blogs/why-is-everyone-talking-about-rudie-in-dandys-world',
        permanent: true,
      },
      {
        source: '/ja/blogs/dandys-world-draw-pebble-how-to',
        destination: '/ja/blogs/why-is-everyone-drawing-pebble-from-dandys-world',
        permanent: true,
      },
      {
        source: '/ja/blogs/how-to-draw-shelly-from-dandys-world',
        destination: '/ja/blogs/why-is-everyone-drawing-shelly-from-dandys-world',
        permanent: true,
      },
      {
        source: '/ja/blogs/how-to-draw-rudie-in-dandys-world',
        destination: '/ja/blogs/why-is-everyone-talking-about-rudie-in-dandys-world',
        permanent: true,
      },
      {
        source: '/ko/blogs/dandys-world-draw-pebble-guide',
        destination: '/ko/blogs/why-is-everyone-drawing-pebble-from-dandys-world',
        permanent: true,
      },
      {
        source: '/ko/blogs/how-to-draw-shelly-dandys-world',
        destination: '/ko/blogs/why-is-everyone-drawing-shelly-from-dandys-world',
        permanent: true,
      },
      {
        source: '/ko/blogs/why-draw-rudie-in-dandys-world',
        destination: '/ko/blogs/why-is-everyone-talking-about-rudie-in-dandys-world',
        permanent: true,
      },
      {
        source: '/pt/blogs/como-desenhar-o-pebble-de-dandys-world',
        destination: '/pt/blogs/why-is-everyone-drawing-pebble-from-dandys-world',
        permanent: true,
      },
      {
        source: '/pt/blogs/como-desenhar-shelly-dandys-world',
        destination: '/pt/blogs/why-is-everyone-drawing-shelly-from-dandys-world',
        permanent: true,
      },
      {
        source: '/pt/blogs/porque-e-que-toda-a-gente-esta-a-falar-do-rudie-em-dandys-world',
        destination: '/pt/blogs/why-is-everyone-talking-about-rudie-in-dandys-world',
        permanent: true,
      },
      {
        source: '/ru/blogs/kak-narisovat-pebble-iz-dandys-world',
        destination: '/ru/blogs/why-is-everyone-drawing-pebble-from-dandys-world',
        permanent: true,
      },
      {
        source: '/ru/blogs/kak-narisovat-shelly-iz-dandys-world',
        destination: '/ru/blogs/why-is-everyone-drawing-shelly-from-dandys-world',
        permanent: true,
      },
      {
        source: '/ru/blogs/kak-narisovat-rudie-iz-dandys-world',
        destination: '/ru/blogs/why-is-everyone-talking-about-rudie-in-dandys-world',
        permanent: true,
      },
      {
        source: '/tw/blogs/how-to-draw-dandys-world-pebble',
        destination: '/tw/blogs/why-is-everyone-drawing-pebble-from-dandys-world',
        permanent: true,
      },
      {
        source: '/tw/blogs/how-to-draw-dandys-world-shelly',
        destination: '/tw/blogs/why-is-everyone-drawing-shelly-from-dandys-world',
        permanent: true,
      },
      {
        source: '/tw/blogs/why-everyone-is-drawing-rudie-dandys-world',
        destination: '/tw/blogs/why-is-everyone-talking-about-rudie-in-dandys-world',
        permanent: true,
      },
      {
        source: '/:lang/article',
        destination: '/:lang/',
        permanent: true,
      },
      {
        source: '/:path*',
        destination: '/',
        permanent: true,
        has: [
          {
            type: 'host',
            value: '(.*)undefined(.*)',
          },
        ],
      },
    ];
  },
  env: {
    UE_COS_SECRET_ID: process.env.UE_COS_SECRET_ID,
    UE_COS_SECRET_KEY: process.env.UE_COS_SECRET_KEY,
    UE_COS_REGION: process.env.UE_COS_REGION,
    UE_COS_BUCKET: process.env.UE_COS_BUCKET,
    UE_COS_PUBLIC_PATH: process.env.UE_COS_PUBLIC_PATH,
    UE_PAYPAL_CLIENT_ID: process.env.UE_PAYPAL_CLIENT_ID,
    UE_PAYPAL_CLIENT_SECRET: process.env.UE_PAYPAL_CLIENT_SECRET,
    UE_STRIPE_PK: process.env.UE_STRIPE_PK,
    UE_PROCESS_API_URL: process.env.UE_PROCESS_API_URL,
    UE_S3_ACCESS_KEY: process.env.UE_S3_ACCESS_KEY,
    UE_S3_SECRET_KEY: process.env.UE_S3_SECRET_KEY,
    UE_S3_SESSION_TOKEN: process.env.UE_S3_SESSION_TOKEN,
    UE_S3_ENDPOINT: process.env.UE_S3_ENDPOINT,
    UE_S3_ACCOUNT_ID: process.env.UE_S3_ACCOUNT_ID,
    UE_S3_REGION: process.env.UE_S3_REGION,
    UE_S3_BUCKET: process.env.UE_S3_BUCKET,
    UE_GOOGLE_CLIENT_ID:process.env.UE_GOOGLE_CLIENT_ID,
    UE_GOOGLE_CLIENT_SECRET:process.env.UE_GOOGLE_CLIENT_SECRET,
    UE_WEB_API_URL:process.env.UE_WEB_API_URL,
    UE_S3_PUBLIC_PATH:process.env.UE_S3_PUBLIC_PATH,
    UE_MQ_API_URL:process.env.UE_MQ_API_URL,
    AUTH_SECRET:process.env.AUTH_SECRET
  }
}

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default withContentlayer(nextConfig);
