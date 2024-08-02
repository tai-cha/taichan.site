<template>
  <main :class="$style.root">
    <h1>ブログ記事一覧</h1>
    <BlogList :pages="blogs" />
  </main>
</template>
<script lang="ts" setup>
const { data: blogs } = await useAsyncData('blogs', () => queryContent('blog').only(['_path', 'title', 'description', 'tags', 'thumbnail', 'createdAt', 'updatedAt', 'draft']).where({ draft: false }).sort({ createdAt: -1 }).find())

useSeoMeta({
  title: 'ブログ一覧',
  ogTitle: 'ブログ一覧',
  description: 'ブログ記事の一覧です。',
})
</script>
<style module>
.root {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>