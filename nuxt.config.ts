import type { BundledTheme } from "shiki";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxthq/studio',
    "@nuxt/image",
    "@nuxt/icon",
    "nuxt-gtag"
  ],

  icon: {
    customCollections: [
      { prefix: 'tai', dir: './assets/my-icons' }
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
      ]
    }
  },

  content: {
    highlight: {
      theme: {
        default: 'one-light' as BundledTheme,
        "theme-light": "one-light" as BundledTheme,
        "theme-dark": "solarized-dark",
      },
      langs: ['js','ts','jsx','tsx','json','json5','vue','css','html','vue','shell','bash','zsh','ruby','yml','docker','bat','csharp','sql','diff','erb','md','ps','sass',]
    },
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    }
  },

  vite: {
    build: {
      target: ['es2022', 'edge89', 'firefox89', 'chrome89', 'safari15']
    },
  },

  nitro: {
    esbuild: {
      options: {
        target: 'es2022'
      }
    }
  },

  compatibilityDate: '2024-07-13',
})