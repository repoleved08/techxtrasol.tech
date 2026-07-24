import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({

  // SSR mode

  ssr: true,

  // Meta data

  app: {
    head: {
      title: 'TechXtrasol — Software Engineering Company',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'manifest', href: '/manifest.json' }
      ],
      meta: [
        { name: 'description', content: 'TechXtrasol is a software engineering company that designs, builds, deploys, and supports mission-critical digital systems for businesses in Kenya, Africa, and globally.' },
        { name: 'keywords', content: 'software development company Kenya, software development Africa, custom software Kenya, Laravel developers Kenya, Vue.js development, Nuxt development, mobile app development Kenya, enterprise software, ERP development, HR system development, AI software company, cloud consulting Kenya, digital transformation, software engineering Kenya' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'TechXtrasol — Software Engineering Company' },
        { property: 'og:description', content: 'Software engineering company building mission-critical digital systems for businesses in Kenya, Africa, and globally.' },
        { property: 'og:image', content: '/1200x630.jpg' },
        { property: 'og:url', content: 'https://techxtrasol.tech' },
        { property: 'og:site_name', content: 'TechXtrasol' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'TechXtrasol — Software Engineering Company' },
        { name: 'twitter:description', content: 'Software engineering company building mission-critical digital systems for businesses in Kenya, Africa, and globally.' },
        { name: 'twitter:image', content: '/1200x630.jpg' },
        { name: 'theme-color', content: '#18181b' },
      ],
    }
  },

  //  Nuxt modules

  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxt/icon', '@nuxtjs/sitemap', '@nuxtjs/robots'],

  // Nuxt icons

  icon: {
    customCollections: [
      {
        prefix: 'bs-icon',
        dir: './app/assets/icons'
      },
    ],
  },

  // Nuxt fonts

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700]
    },
  },

  // Tailwind

  css: [
    '~/assets/css/base.css',
    '~/assets/css/buttons.css',
    '~/assets/css/global.css',
    '~/assets/css/layout.css',
    '~/assets/css/typography.css',
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  // SEO
  site: {
    url: 'https://techxtrasol.tech',
    name: 'TechXtrasol',
  },

  // Sitemap configuration
  sitemap: {
    hostname: 'https://techxtrasol.tech',
    exclude: [
      '/credits',
      '/__sitemap__/**',
    ],
  },

  // Robots.txt
  robots: {
    allow: '/',
    sitemap: 'https://techxtrasol.tech/sitemap.xml',
    disallow: ['/credits', '/_nuxt/'],
    extraRobotsTags: {
      'LLMs': 'https://techxtrasol.tech/llms.txt',
      'LLMs-full': 'https://techxtrasol.tech/llms-full.txt',
    },
  },

})