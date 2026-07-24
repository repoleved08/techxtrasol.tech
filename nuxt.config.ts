import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({

  // SSR mode

  ssr: true,

  // Meta data

  app: {
    head: {
      title: 'Techxtrasol — Custom Software Development Company',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'manifest', href: '/manifest.json' }
      ],
      meta: [
        { name: 'description', content: 'Techxtrasol builds custom software, web applications, mobile apps, and enterprise systems that help businesses in Kenya and beyond digitize, automate, and grow.' },
        { name: 'keywords', content: 'software development Kenya, web development Kenya, custom software Kenya, mobile app development Kenya, Laravel developers Kenya, Nuxt developers, business systems Kenya, enterprise software, website developers Nairobi, software company Kenya, tech blog Kenya' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Techxtrasol — Custom Software Development Company' },
        { property: 'og:description', content: 'Custom software, web applications, mobile apps, and enterprise systems that help businesses digitize, automate, and grow.' },
        { property: 'og:image', content: '/1200x630.jpg' },
        { property: 'og:url', content: 'https://techxtrasol.tech' },
        { property: 'og:site_name', content: 'Techxtrasol' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Techxtrasol — Custom Software Development Company' },
        { name: 'twitter:description', content: 'Custom software, web applications, mobile apps, and enterprise systems that help businesses digitize, automate, and grow.' },
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
    ],
    sources: [
      '/api/__sitemap__/urls',
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