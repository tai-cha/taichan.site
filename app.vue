<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { provide } from 'vue';
import { useHtmlClass } from './composables/useHtmlClass';

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
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }
  ],
  titleTemplate: (titleChunk) => {
    return `${titleChunk ? titleChunk + ' | ' : ''}` + 'taichanのサイト';
  }
})
</script>