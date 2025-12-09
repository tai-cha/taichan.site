<template>
  <code :class="[$style.code, (props.class || '')]"><slot /></code>
</template>

<script setup lang="ts">
import { bundledThemes } from 'shiki';
import type { BundledTheme } from 'shiki';

const config = useRuntimeConfig();
const themeConfig = config.public.highlight.theme as Record<string, BundledTheme>;

const lightTheme = await bundledThemes[themeConfig['theme-light']]().then(m => m.default);
const darkTheme = await bundledThemes[themeConfig['theme-dark']]().then(m => m.default);

const lightBg = lightTheme.colors?.['editor.background'] || lightTheme.bg;
const lightFg = lightTheme.colors?.['editor.foreground'] || lightTheme.fg;
const darkBg = darkTheme.colors?.['editor.background'] || darkTheme.bg;
const darkFg = darkTheme.colors?.['editor.foreground'] || darkTheme.fg;

const props = defineProps<{
  class?: string | null,
  style?: string | object | null,
}>();
</script>

<style module>
.code {
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  font-family: monospace;
  
  /* Default (light) */
  background-color: v-bind(lightBg);
  color: v-bind(lightFg);
}

html:global(.theme-light) .code {
  background-color: v-bind(lightBg);
  color: v-bind(lightFg);
}

html:global(.theme-dark) .code {
  background-color: v-bind(darkBg);
  color: v-bind(darkFg);
}
</style>
