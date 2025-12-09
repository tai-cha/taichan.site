<template>
  <div :class="$style.container">
    <span v-if="props.language != null || props.filename != null" :class="$style.codeInfo">
      <span v-if="props.filename == null && props.language != null" :class="$style.language">{{ props.language }}</span>
      <span v-if="props.filename != null">{{ props.filename }}</span>
    </span>
    <div :class="$style.actions">
      <div :class="$style.actionGroup">
        <span v-show="hoveredAction === 'wrap'" :class="$style.tooltip">Toggle Wrap</span>
        <span :class="[$style.actionButton, isWrapEnabled ? $style.active : '']" @click="toggleWrap" @mouseenter="hoveredAction = 'wrap'" @mouseleave="hoveredAction = null">
          <Icon name="uil:wrap-text" />
        </span>
      </div>
      <div :class="$style.actionGroup">
        <span v-show="hoveredAction === 'copy' || copyStatus === 'Copied!'" :class="$style.tooltip">{{ copyStatus }}</span>
        <span :class="$style.actionButton" @click="onCopyClicked" @mouseenter="hoveredAction = 'copy'" @mouseleave="hoveredAction = null">
          <Icon name="uil:clipboard-alt" />
        </span>
      </div>
    </div>
    <pre :class="[$style.codes, props.class, isWrapEnabled ? $style.wrap : '']" :style="props.style"><slot /></pre>

  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { bundledThemes } from 'shiki';
import type { BundledTheme } from 'shiki';

let clipBoard = useClipboard();

const isWrapEnabled = ref(false);
const hoveredAction = ref<string | null>(null);
const copyStatus = ref('Copy');

const props = withDefaults(
  defineProps<{
    code?: string
    language?: string | null
    filename?: string | null
    highlights?: Array<number>
    meta?: string | null,
    class?: string | null
    style?: string | object | null
  }>(),
  { code: '', language: null, filename: null, highlights: () => [] as Array<number>, meta: null, class: null, style: null }
)

const config = useRuntimeConfig();
const themeConfig = config.public.highlight.theme as Record<string, BundledTheme>;

const lightTheme = await bundledThemes[themeConfig['theme-light']]().then(m => m.default);
const darkTheme = await bundledThemes[themeConfig['theme-dark']]().then(m => m.default);

const lightBg = lightTheme.colors?.['editor.background'] || lightTheme.bg;
const lightFg = lightTheme.colors?.['editor.foreground'] || lightTheme.fg;
const darkBg = darkTheme.colors?.['editor.background'] || darkTheme.bg;
const darkFg = darkTheme.colors?.['editor.foreground'] || darkTheme.fg;

const toggleWrap = () => {
  isWrapEnabled.value = !isWrapEnabled.value;
}

const onCopyClicked = async () => {
  await clipBoard.copy(props.code);
  copyStatus.value = 'Copied!';
  setTimeout(() => {
    copyStatus.value = 'Copy';
  }, 1000);
}
</script>
<style module>
.container {
  /* デフォルト (light) */
  --code-block-bg: v-bind(lightBg);
  --code-block-fg: v-bind(lightFg);
  /* Derived colors */
  --code-block-info-bg: color-mix(in srgb, var(--code-block-fg) 12%, var(--code-block-bg));
  --code-block-info-fg: var(--code-block-fg);
  --code-block-highlight-bg: color-mix(in srgb, var(--code-block-fg) 10%, transparent);
}

html:global(.theme-light) .container {
  --code-block-bg: v-bind(lightBg);
  --code-block-fg: v-bind(lightFg);
}

html:global(.theme-dark) .container {
  --code-block-bg: v-bind(darkBg);
  --code-block-fg: v-bind(darkFg);
}

.container {
  box-sizing: border-box;
  background-color: var(--code-block-bg);
  color: var(--code-block-fg);
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  padding: 1.5rem 4px 0 4px;
  width: 100%;
  max-width: calc(80vw - 170px);
}

.codeInfo {
  background-color: var(--code-block-info-bg);
  color: var(--code-block-info-fg);
  position: absolute;
  top: 0;
  left: 28px;
  padding: 2px 8px;
  border-radius: 0 0 0.5rem 0.5rem;
}

.actions {
  position: absolute;
  top: 4px;
  right: 5px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.actionGroup {
  position: relative;
  display: flex;
  align-items: center;
}

.actionButton {
  font-size: 20px;
  cursor: pointer;
  color: var(--code-block-fg);
  display: flex;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.actionButton:hover, .actionButton.active {
  opacity: 1;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background-color: var(--code-block-info-bg);
  color: var(--code-block-info-fg);
  font-size: small;
  border-radius: 0.5rem;
  padding: 2px 4px;
  margin-bottom: 4px;
  z-index: 10;
}

.codes {
  box-sizing: border-box;

  width: 100%;
  scrollbar-width: thin;
  scrollbar-gutter: thin;
  position: relative;
  overflow-x: auto;
  white-space: pre;

  &.wrap {
    white-space: pre-wrap;
    word-break: break-all;
  }

  &.wrap > code > span:global(.line) {
    display: inline-block;
    width: 100%;
    padding-left: 2rem;
    text-indent: -2rem;
    box-sizing: border-box;
  }

  span:global(.highlight) {
    background-color: var(--code-block-highlight-bg);
  }

  & > code {
    scrollbar-width: thin;
    scrollbar-gutter: thin;
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo, Courier, Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji, monospace;
    font-size: 14px;
    overflow-x: auto;
    width: 100%;
    display: inline-block;
  }

  & > code > span:global(.line)::before {
    font-family: monospace;
    content: attr(line);
    display: inline-block;
    width: 1rem;
    height: 100%;
    text-align: right;
    margin-right: 1rem;
    color: var(--code-block-fg);
    opacity: 0.5;
  }
}

@media screen and (max-width: 960px) {
  .container {
    max-width: calc(100vw - 60px);
  }
}
</style>