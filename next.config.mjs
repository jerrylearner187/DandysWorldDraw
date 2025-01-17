/** @type {import('next').NextConfig} */
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import { resolve } from "path";
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
  // 输出配置（替代旧的 runtime 配置）
  output: 'standalone',
  trailingSlash: true,
  webpack: (config, { webpack, dev, isServer }) => {
    // if (dev && !isServer) {
    //   config.devtool = 'eval-source-map'
    // }
    if (!isServer) {
      // 避免 Edge Runtime 中的 Node.js 特定模块
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    config.module.rules.push({
      test: /\/translations\/.*\/.*\.json$/,
      use: {
        loader: '@lingui/loader'
      }
    })
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   react: resolve("node_modules/react"),
    //   "react-dom": resolve("node_modules/react-dom"),
    // }
    // 确保 React Server Components 支持
    if (isServer) {
      config.resolve = {
        ...config.resolve,
        conditionNames: ['react-server', 'node', 'import', 'require', ...(config.resolve.conditionNames ?? [])]
      };
    } else {
      config.resolve = {
        ...config.resolve,
        conditionNames: ['browser', 'import', 'require', ...(config.resolve.conditionNames ?? [])]
      };
    }
    // 添加新的插件配置
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /canvas|jsdom/,
        contextRegExp: /konva/
      })
    )
    // 添加 watchOptions 配置
    config.watchOptions = {
      poll: 1000, // 轮询间隔
      aggregateTimeout: 300, // 防抖时间
    }
    return config
  },
  // 其他必要的配置
  transpilePackages: ['@nextui-org/react', '@lingui/core'],
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
  images: {
    domains: ['cdn.poe2db.tw', 'img.poe2.biz'], // 添加允许的图片域名
    // 或者使用 remotePatterns 以获得更细粒度的控制
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.poe2db.tw',
        port: '',
        pathname: '/**',
      },
    ],
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
