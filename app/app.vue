<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { provide } from 'vue';
import { useHtmlClass } from './composables/useHtmlClass';

const runtimeConfig = useRuntimeConfig();
const router = useRouter();
const currentUrl = computed(() => `${runtimeConfig.public.baseUrl}${router.currentRoute.value.path}`);

type colorScheme = 'light' | 'dark';
const colorScheme = ref<colorScheme>('light');
provide('colorScheme', colorScheme);

onMounted(() => {
  //#region Color Scheme
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    colorScheme.value = 'dark';
    useHtmlClass().addClass('theme-dark');
  } else {
    colorScheme.value = 'light';
    useHtmlClass().addClass('theme-light');
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    colorScheme.value = e.matches ? 'dark' : 'light';
    if (colorScheme.value === 'light') {
      useHtmlClass().replaceClass('theme-dark', 'theme-light');
    } else {
      useHtmlClass().replaceClass('theme-light', 'theme-dark');
    }
  });
  //#endregion
});

useHead({
  htmlAttrs: {
    lang: 'ja'
  },
  meta: [
    { property: 'og:url', content: currentUrl }
  ],
  titleTemplate: (titleChunk) => {
    return `${titleChunk ? titleChunk + ' | ' : ''}` + 'taichanのサイト';
  }
})
</script>