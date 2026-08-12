import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({

  // SSR mode

  ssr: true,

  // Runtime config

  runtimeConfig: {
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
    resendApiKey: process.env.RESEND_API_KEY,
    notificationEmail: process.env.NOTIFICATION_EMAIL,
    indexnowKey: process.env.INDEXNOW_KEY || 'e62b6d50bfb44503b030be33b9101571',
    supabase: {},
    public: {
      supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY,
        cookiePrefix: 'sb-ytakvlhdrfmktkputzjg',
      },
    },
  },

  // Meta data

  app: {
    head: {
      title: 'TechXtrasol — Software Engineering Company',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
        { rel: 'preconnect', href: 'https://www.google-analytics.com' },
        ...(process.env.SUPABASE_URL ? [
          { rel: 'preconnect', href: process.env.SUPABASE_URL },
          { rel: 'dns-prefetch', href: process.env.SUPABASE_URL },
        ] : []),
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-YEJTW5MG5V',
          async: true,
        },
        {
          children: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YEJTW5MG5V');`,
          tagPosition: 'bodyClose',
        },
      ],
      meta: [
        { name: 'description', content: 'TechXtrasol is a software engineering company that designs, builds, deploys, and supports mission-critical digital systems for businesses in Kenya, Africa, and globally.' },
        { name: 'keywords', content: 'software development company Kenya, software development Africa, custom software Kenya, Laravel developers Kenya, Vue.js development, Nuxt development, mobile app development Kenya, enterprise software, ERP development, HR system development, AI software company, cloud consulting Kenya, digital transformation, software engineering Kenya' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'TechXtrasol — Software Engineering Company' },
        { property: 'og:description', content: 'Software engineering company building mission-critical digital systems for businesses in Kenya, Africa, and globally.' },
        { property: 'og:image', content: 'https://www.techxtrasol.tech/content-images/blog-default-og.jpg' },
        { property: 'og:url', content: 'https://www.techxtrasol.tech' },
        { property: 'og:site_name', content: 'TechXtrasol' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'TechXtrasol — Software Engineering Company' },
        { name: 'twitter:description', content: 'Software engineering company building mission-critical digital systems for businesses in Kenya, Africa, and globally.' },
        { name: 'twitter:image', content: 'https://www.techxtrasol.tech/content-images/blog-default-og.jpg' },
        { name: 'theme-color', content: '#18181b' },
      ],
    }
  },

  //  Nuxt modules

  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxt/icon', '@nuxt/content', 'nuxt-security', '@nuxtjs/supabase', '@nuxtjs/seo'],

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
    '~/assets/css/blog-content.css',
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  // SEO
  site: {
    url: 'https://www.techxtrasol.tech',
    name: 'TechXtrasol',
  },

  // Schema.org structured data
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'TechXtrasol',
      url: 'https://www.techxtrasol.tech',
      logo: 'https://www.techxtrasol.tech/icons/logo.svg',
      description: 'Software engineering company building mission-critical digital systems for businesses in Kenya, Africa, and globally.',
      sameAs: [
        'https://www.linkedin.com/company/techxtrasol',
        'https://github.com/techxtrasol',
        'https://x.com/techxtrasol',
      ],
    },
  },

  // Dynamically generated per-page OG images using the Satori renderer (no browser required).
  ogImage: {
    enabled: true,
    defaults: {
      component: 'Default',
      width: 1200,
      height: 630,
      extension: 'png',
    },
  },

  // Sitemap configuration
  sitemap: {
    hostname: 'https://www.techxtrasol.tech',
    exclude: [
      '/credits',
      '/admin/**',
      '/api/**',
      '/__sitemap__/**',
      '/auth/**',
      '/login',
      '/_og/**',
    ],
    sources: [
      '/api/__sitemap__/urls',
    ],
  },

  // Robots.txt
  robots: {
    allow: '/',
    sitemap: 'https://www.techxtrasol.tech/sitemap.xml',
    disallow: ['/credits', '/admin/', '/api/', '/_nuxt/', '/_og/'],
    groups: [
      {
        userAgents: ['LLMs', 'LLMs-full'],
        allow: ['/llms.txt', '/llms-full.txt'],
      },
    ],
  },

  // Security
  security: {
    rateLimiter: {
      tokensPerInterval: 100,
      interval: 60000,
      headers: true,
    },
    headers: {
      contentSecurityPolicy: {
        'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://www.googletagmanager.com', 'https://www.google-analytics.com'],
        'script-src-attr': ["'unsafe-inline'"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'img-src': ["'self'", 'data:', 'https:', 'http:'],
        'font-src': ["'self'", 'https:', 'data:'],
        'connect-src': ["'self'", 'https:', 'http:'],
      },
    },
  },

  // Supabase Auth
  supabase: {
    redirect: false,
  },

})