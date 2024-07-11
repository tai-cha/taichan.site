// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxthq/studio', "@nuxt/image", "@nuxt/icon"],
  icon: {
    customCollections: [
      { prefix: 'tai', dir: './assets/my-icons' }
    ]
  }
})