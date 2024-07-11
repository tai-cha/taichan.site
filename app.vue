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
    useHtmlClass().removeClass('theme-light');
  } else {
    colorScheme.value = 'light';
    useHtmlClass().addClass('theme-light');
    useHtmlClass().removeClass('theme-dark');
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    colorScheme.value = e.matches ? 'dark' : 'light';
    if (colorScheme.value === 'light') {
      useHtmlClass().removeClass('theme-dark');
      useHtmlClass().addClass('theme-light');
    } else {
      useHtmlClass().removeClass('theme-light');
      useHtmlClass().addClass('theme-dark');
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
    return `${titleChunk ? titleChunk + ' | ' : ''}` + '| taichanのサイト';
  }
})
</script>