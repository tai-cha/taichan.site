<template>
  <div :class="$style.container">
    <h1>ニュース一覧</h1>
    <div v-for="page in news">
      <NuxtLink :to="page._path">{{ page.title }} {{ page.createdAt }}</NuxtLink>
    </div>
    <div v-if="news != null || news!.length > 0">ニュースはありません</div>
  </div>
</template>
<script lang="ts" setup>
const { data: news } = await useAsyncData('news', () => queryContent('news').only(['_path', 'title', 'createdAt', 'updatedAt', 'draft']).where({ draft: false }).find())

useHead({
  title: 'ニュース一覧'
})
</script>
<style module>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>