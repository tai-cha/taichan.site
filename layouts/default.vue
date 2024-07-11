<script lang="ts" setup>
</script>

<template>
  <header>
    <NuxtLink to="/" :class="$style.header_link">
      <NuxtImg :class="$style.logo" width="40px" height="40px" src="https://avatars.githubusercontent.com/u/40626578?v=4" alt="" />
      taichanのサイト
    </NuxtLink>

    <div :class="$style.links">
      <NuxtLink to="/links">Links</NuxtLink>
      <ThemeSwitcher />
    </div>

  </header>
  <div :class="$style.page">
    <slot />
  </div>
  <footer></footer>
</template>
<style>
:root {
  color: var(--text-normal);
  font-family: 'Yu Gothic', 'YuGothic', '游ゴシック', '游ゴシック体', 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro', 'メイリオ', 'Meiryo', 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
  --border-radius: 12px;
}

html:not(.theme-dark) {
  --accent: #0095af;
  --bg: #a7ccd3;
  --bg-rgb: 254, 218, 218;
  --bg-sub: #EEEEEE;
  --bg-sub-rgb: 238, 238, 238;
  --text-normal: #5f5f5f;
  --text-normal-rgb: 95, 95, 95;
  --text-sub: #fafafa;
  --text-sub-rgb: 250, 250, 250;
  --text-link: #1bacb6;
}

html.theme-dark {
  --accent: #0095af;
  --bg: #688d94;
  --bg-rgb: 104, 141, 148;
  --bg-sub: #808080;
  --bg-sub-rgb: 63, 63, 63;
  --text-normal: #ffffff;
  --text-normal-rgb: 255, 255, 255;
  --text-sub: #fafafa;
  --text-link: #20eefd;
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

header {
  align-items: center;
  justify-content: space-between;
  background-color: var(--accent);
  color: var(--text-sub);
  display: flex;
  padding: 12px 8px;
  font-weight: 500;
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
  gap: 8px;
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
  background-color: rgba(var(--bg-sub-rgb), 0.45);
  border-radius: var(--border-radius);
  display: flex;
  margin: 12px 16px;
  padding: 4px 16px 4px;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  border-bottom: 1px solid rgba(var(--text-normal-rgb), 0.5);
  margin: 16px 0;
  & > a {
    color: var(--text-normal);
    text-decoration: none;
  }
}

h2 {
  font-size: 24px;
  font-weight: 700;
  padding: 0;
  margin: 32px 0 16px 0;
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