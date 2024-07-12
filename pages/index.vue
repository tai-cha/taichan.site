<script lang="ts" setup>
const descriptions = [
  'A Web Application Engineer',
  'A Misskey Contributor',
  'A Misskey Server Operator',
  'A Human',
  'A Gamer',
  'A Tech Otaku'
]

useSeoMeta({
  title: 'Home'
})
</script>

<template>
  <main>
    <div :class="$style.container">
      <img :class="$style.profile" class="profile" src="https://avatars.githubusercontent.com/u/40626578?v=4" alt="tai-cha">
      <span :class="$style.name">taichan</span>
      <TypeWriter :texts="descriptions" />
      <NuxtLink to="/about" :class="$style.readMore">Read more about me</NuxtLink>
      <span><Icon :class="$style.icon" name="uil:github" color="black" /><a href="https://github.com/tai-cha">GitHub (tai-cha)</a></span>
      <span><Icon :class="$style.icon" name="uil:twitter" color="#1DA1F2" /><a href="https://twitter.com/taichan_v2">Twitter (@taichan_v2)</a></span>

      <span :class="$style.guideForNadesskey">もしかして: お探しのサイトは<a href="mi.taichan.site"><Icon :class="$style.icon" name="tai:nadesskey" />なですきー</a></span>
    </div>
  </main>
</template>
<style module>
  h2 {
    text-decoration: none;
  }

  .name {
    font-size: 32px;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .profile {
    border-radius: 50%;
    width: 200px;
  }

  .readMore {
    &:before {
      content: '>';
      margin-right: 8px;
    }
    background-color: var(--accent);
    border: 2px solid var(--text-normal);
    color: var(--text-sub);
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 40px;

    font-weight: 500;

    margin: 20px 0;

    text-decoration: none;
  }

  .guideForNadesskey {
    margin-top: 20px;
  }

  .icon {
    vertical-align: text-bottom;
    width: 1.4em;
    height: 1.4em;
  }
</style>