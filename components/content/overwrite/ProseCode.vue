<template>
  <div :class="[$style.container, props.class]">
    <span v-if="props.language != null || props.filename != null" :class="$style.codeInfo">
      <span v-if="props.filename == null && props.language != null" :class="$style.language">{{ props.language }}</span>
      <span v-if="props.filename != null">{{ props.filename }}</span>
    </span>
    <span :class="$style.copyButton" @mouseenter="onCopyMouseAction" @mouseleave="onCopyMouseAction" @click="onCopyClicked"><Icon name="uil:clipboard-alt"></Icon></span>
    <span v-show="isTooltipVisible" :class="$style.copyTooltip" ref="copy-tooltip">{{ copyTooltipText }}</span>
    <div :class="$style.codes">
      <slot />
    </div>

  </div>
</template>

<script setup lang="ts">
import { bundledThemes, type BundledTheme, type ThemeRegistration } from 'shiki';
import { useClipboard } from '@vueuse/core';
let clipBoard = useClipboard();

const runtimeConfig = useRuntimeConfig();
const theme : undefined | Record<string, BundledTheme> | BundledTheme = runtimeConfig.public?.content?.highlight ? runtimeConfig.public.content.highlight.theme : undefined;
const defaultTheme = ref<ThemeRegistration | null>(null);
const lightTheme = ref<ThemeRegistration | null>(null);
const darkTheme = ref<ThemeRegistration | null>(null);

const isTooltipVisible = ref(false);
const copyTooltip = ref<HTMLElement | null>(null);
const copyTooltipText = ref('Copy');

if (theme != null) {
  if (typeof theme === 'string') {
    defaultTheme.value = (await bundledThemes[theme]()).default;
  } else {
    if (theme["default"] != null) {
      defaultTheme.value = (await bundledThemes[theme["default"]]()).default;
    }
    if (theme["theme-light"] != null) {
      lightTheme.value = (await bundledThemes[theme["theme-light"]]()).default;
    }
    if (theme["theme-dark"] != null) {
      darkTheme.value = (await bundledThemes[theme["theme-dark"]]()).default;
    }
  }
}

const defaultThemeBg = defaultTheme.value?.colors?.['editor.background'] || '#fff';
const lightThemeBg = lightTheme.value?.colors?.['editor.background'] || '#fff';
const darkThemeBg = darkTheme.value?.colors?.['editor.background'] || '#000';

const defaultThemeTooltipBg = defaultTheme.value?.colors?.['tab.inactiveBackground'] || '#f0f0f0';
const lightThemeTooltipBg = lightTheme.value?.colors?.['tab.inactiveBackground'] || '#f0f0f0';
const darkThemeTooltipBg = darkTheme.value?.colors?.['tab.inactiveBackground'] || '#333';
const defaultThemeTooltipFg = defaultTheme.value?.colors?.['tab.inactiveForeground'] || '#333';
const lightThemeTooltipFg = lightTheme.value?.colors?.['tab.inactiveForeground'] || '#333';
const darkThemeTooltipFg = darkTheme.value?.colors?.['tab.inactiveForeground'] || '#f0f0f0';
const defaultThemeSelectionBg = defaultTheme.value?.colors?.['editor.selectionBackground'] || '#44475A';
const lightThemeSelectionBg = lightTheme.value?.colors?.['editor.selectionBackground'] || '#44475A';
const darkThemeSelectionBg = darkTheme.value?.colors?.['editor.selectionBackground'] || '#44475A';

const props = withDefaults(
  defineProps<{
    code?: string
    language?: string | null
    filename?: string | null
    highlights?: Array<number>
    meta?: string | null,
    class?: string | null
  }>(),
  { code: '', language: null, filename: null, highlights: () => [] as Array<number>, meta: null, class: null }
)

const onCopyMouseAction = (e: MouseEvent) => {
  window.console.log("onCopyMouseAction", e.type, copyTooltip.value)
  if (e.type === 'mouseenter') {
    isTooltipVisible.value = true;
  } else {
    isTooltipVisible.value = false;
  }
}

const onCopyClicked = async () => {
  await clipBoard.copy(props.code);
  copyTooltipText.value = 'Copied!';
  isTooltipVisible.value = true;
  setTimeout(() => {
    isTooltipVisible.value = false;
    copyTooltipText.value = 'Copy';
  }, 1000);
}
</script>
<style module>
.container {
  --shiki-default-bg: v-bind(defaultThemeBg);
  --shiki-theme-light-bg: v-bind(lightThemeBg);
  --shiki-theme-dark-bg: v-bind(darkThemeBg);
}

html:global(.theme-light) .container {
  background-color: var(--shiki-theme-light-bg);

  span:global(.highlight) {
    background-color: v-bind(lightThemeSelectionBg);
    --shiki-theme-light-bg: v-bind(lightThemeSelectionBg);
  }
}
html:global(.theme-dark) .container {
  background-color: var(--shiki-theme-dark-bg);

  span:global(.highlight) {
    background-color: v-bind(darkThemeSelectionBg);
    --shiki-theme-dark-bg: v-bind(darkThemeSelectionBg);
  }
}

.container {
  box-sizing: border-box;
  background-color: var(--shiki-default-bg);
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  padding: 1.5rem 4px 0 4px;
  width: 100%;
  max-width: calc(80vw - 170px);
}

html:global(.theme-light) .codeInfo {
  background-color: v-bind(lightThemeTooltipBg);
  color: v-bind(lightThemeTooltipFg);
}

html:global(.theme-dark) .codeInfo {
  background-color: v-bind(darkThemeTooltipBg);
  color: v-bind(darkThemeTooltipFg);
}

.codeInfo {
  background-color: v-bind(defaultThemeTooltipBg);
  color: v-bind(defaultThemeTooltipFg);
  position: absolute;
  top: 0;
  left: 28px;
  padding: 2px 8px;
  border-radius: 0 0 0.5rem 0.5rem;
}

.copyButton {
  position: absolute;
  font-size: 20px;
  top: 4px;
  right: 5px;

  cursor: pointer;
}

.copyTooltip {
  position: absolute;
  background-color: v-bind(defaultThemeTooltipBg);
  font-size: small;
  top: 6px;
  right: 28px;
  border-radius: 0.5rem;
  padding: 2px 4px;
}

.codes {
  box-sizing: border-box;;
  counter-reset: line-num;

  width: 100%;

  span:global(.highlight) {
    background-color: v-bind(defaultThemeSelectionBg);
    --shiki-default-bg: v-bind(defaultThemeSelectionBg);
  }

  & > pre {
    scrollbar-width: thin;
    scrollbar-gutter: thin;
    position: relative;
    overflow-x: auto;
    width: 100%;
    white-space: pre;
    /* TODO: 折り返しの切り替えに対応 */
  }

  & > pre > code {
    scrollbar-width: thin;
    scrollbar-gutter: thin;
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo, Courier, Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji, monospace;
    font-size: 14px;
    overflow-x: auto;
    width: 100%;
    display: inline-block;
  }

  & > pre > code > span {
    counter-increment: line-num;
  }

  & > pre > code > span::before {
    font-family: monospace;
    content: counter(line-num);
    display: inline-block;
    width: 1rem;
    height: 100%;
    text-align: right;
    margin-right: 1rem;
  }
}

@media screen and (max-width: 960px) {
  .container {
    max-width: calc(100vw - 60px);
  }
}
</style>