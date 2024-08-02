<script lang="ts" setup>
const props = defineProps<{
  pageClass?: string,
  pageStyle?: string | string[],
  contentClass?: string,
}>();
</script>

<template>
  <header>
    <NuxtLink to="/" :class="$style.header_link">
      <NuxtImg :class="$style.logo" width="40px" height="40px" src="https://avatars.githubusercontent.com/u/40626578?v=4" alt="" />
      taichanのサイト
    </NuxtLink>

    <div :class="$style.links">
      <NuxtLink to="/docs">Docs</NuxtLink>
      <NuxtLink to="/blog">Blog</NuxtLink>
      <NuxtLink to="/news">News</NuxtLink>
      <NuxtLink to="/links">Links</NuxtLink>
      <ThemeSwitcher />
    </div>

  </header>
  <div :class="[props.pageClass]" :style="props.pageStyle">
    <slot name="before-page" />
    <div class="container" :class="[$style.page, contentClass]">
      <slot />
    </div>
    <slot name="after-page" />
  </div>
  <footer></footer>
</template>
<style lang="scss">
:root {
  color: var(--text-normal);
  font-family: 'Yu Gothic', 'YuGothic', '游ゴシック', '游ゴシック体', 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro', 'メイリオ', 'Meiryo', 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
  --border-radius: 12px;
  scroll-padding-top: 75px;
  scroll-behavior: smooth;
}

h1, h2, h3, h4, h5 {
  scroll-margin-top: 75px;
}

@mixin light-theme {
  --accent: #0095af;
  --bg: #a7ccd3;
  --bg-rgb: 167, 204, 211;
  --bg-sub: #EEEEEE;
  --bg-sub-rgb: 238, 238, 238;
  --text-normal: #5f5f5f;
  --text-normal-rgb: 95, 95, 95;
  --text-sub: #fafafa;
  --text-sub-rgb: 250, 250, 250;
  --text-link: #1bacb6;
  --text-link-rgb: 27, 172, 182;

  --warning: #c1c111;
  --alert: #c11111;
}

@mixin dark-theme {
  --accent: #0095af;
  --bg: #688d94;
  --bg-rgb: 104, 141, 148;
  --bg-sub: #808080;
  --bg-sub-rgb: 63, 63, 63;
  --text-normal: #ffffff;
  --text-normal-rgb: 255, 255, 255;
  --text-sub: #fafafa;
  --text-sub-rgb: 250, 250, 250;
  --text-link: #20eefd;
  --text-link-rgb: 32, 238, 253;

  --warning: #eded17;
  --alert: #ed1717;
}

html.theme-light {
  @include light-theme;
}

html.theme-dark {
  @include dark-theme;
}

@media (prefers-color-scheme: light) or (prefers-color-scheme: no-preference){
  html:not(.theme-light):not(.theme-dark) {
    @include light-theme;
  }
}

@media (prefers-color-scheme: dark) {
  html:not(.theme-light):not(.theme-dark) {
    @include dark-theme;
  }
}
</style>
<style module>
a {
  color: var(--text-link);
}

html, body {
  margin: 0;
  padding: 0;

  background-color: var(--bg);
  line-height: 1.6;
}

main {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
}

header {
  position: sticky;
  top: 0;
  align-items: center;
  justify-content: space-between;
  background-color: var(--accent);
  color: var(--text-sub);
  display: flex;
  padding: 12px 8px;
  font-weight: 500;
  z-index: 100;
}

header a {
  color: var(--text-sub);
  text-decoration: none;
}

.header_link {
  display: flex;
  align-items: center;
  font-size: 19px;
  font-weight: 500;
}

.links {
  align-items: center;
  display: flex;
  gap: 10px;
  margin-right: 8px;
}

.logo {
  border: var(--accent) 1px solid;
  height: 40px;
  width: 40px;
  margin: 0 8px;
  border-radius: 50%;
}

.page {
  background-color: rgba(var(--bg-sub-rgb), 0.55);
  border-radius: var(--border-radius);
  display: flex;
  margin: 12px 16px;
  padding: 4px 16px 16px;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  border-bottom: 1px solid rgba(var(--text-normal-rgb), 0.5);
  margin: 8px 0 16px 0;
  & > a {
    color: var(--text-normal);
    text-decoration: none;
  }
}

h2 {
  font-size: 24px;
  font-weight: 700;
  padding: 0;
  margin: px 0 16px 0;
  & > a {
    color: var(--text-normal);
    text-decoration: none;
  }
}

h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 26px 0 8px 0;
  & > a {
    color: var(--text-normal);
    text-decoration: none;
  }
}

h4 {
  font-size: 16px;
  font-weight: 700;
  border-left: 4px solid var(--accent);
  padding: 0 4px;
  margin: 20px 0 12px 0;
  & > a {
    color: var(--text-normal);
    text-decoration: none;
  }
}

p {
  margin: 12px 0;
}

ul {
  margin: 0;
  padding: 0 0 0 2rem;
}

a {
  font-weight: bold;
}
</style>