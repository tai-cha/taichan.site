import generateSitemap from "./scripts/generate-sitemap";
import type { ThemeRegistrationRaw } from "shiki";

const themeConfig = {
  default: 'one-light',
  'theme-light': 'one-light',
  'theme-dark': 'solarized-dark',
} satisfies { [theme: string]: string | ThemeRegistrationRaw; default: string | ThemeRegistrationRaw; }

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/content', "@nuxt/image", "@nuxt/icon", "nuxt-gtag", "nuxt-jsonld", 'nuxt-studio', 'nuxt-og-image'],

  site: {
    url: 'https://taichan.site',
  },

  ogImage: {
    enabled: true,
    fonts: [
      'BIZ+UDPGothic:400',
      'BIZ+UDPGothic:700',
      { name: 'KodomoRounded', weight: 400, path: '/fonts/KodomoRounded.otf' },
    ],
    defaults: { component: 'Default' }
  },

  icon: {
    customCollections: [
      { prefix: 'tai', dir: './app/assets/my-icons' }
    ]
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ja', prefix: 'og: https://ogp.me/ns#'
      },
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'taichanのサイト' },
        { property: 'og:image', content: 'https://taichan.site/default-ogp.png', },
        { property: 'twitter:image', content: 'https://taichan.site/default-ogp.png' },
        { property: 'twitter:card', content: 'summary_large_image' },
      ]
    }
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: themeConfig,
          langs: ['js', 'ts', 'jsx', 'tsx', 'json', 'json5', 'vue', 'css', 'html', 'vue', 'shell', 'bash', 'zsh', 'ruby', 'yml', 'docker', 'bat', 'csharp', 'sql', 'diff', 'erb', 'md', 'ps', 'sass',]
        }
      }
    }
  },

  studio: {
    repository: {
      provider: 'github',
      owner: 'ta-cha',
      repo: 'taichan.site',
      branch: 'master',
    }
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      useNuxtImageInMdc: true,
      highlight: {
        theme: themeConfig
      }
    }
  },

  vite: {
    build: {
      target: ['es2022', 'edge89', 'firefox89', 'chrome89', 'safari15']
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/blog/**': { prerender: true },
    '/news/**': { prerender: true },
    '/docs/**': { prerender: true },
    '/links': { prerender: true },
    '/privacy-policy': { prerender: true },
    '/404.html': { prerender: true },
    '/**/__og_image__/**': { isr: 31536000 }, // 1 year cache. Basically static once generated.
  },

  nitro: {
    preset: 'cloudflare-pages',
    esbuild: {
      options: {
        target: 'es2022'
      }
    },
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/about',
        '/blog',
        '/blog/tags',
        '/news',
        '/docs',
        '/links',
        '/privacy-policy',
        '/404.html',
      ]
    },
    hooks: {
      compiled: generateSitemap
    }
  },

  compatibilityDate: '2025-12-09',
})