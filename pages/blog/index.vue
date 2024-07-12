<template>
  <div :class="$style.root">
    <h1>ブログ記事一覧</h1>
    <BlogList :pages="blogs" />
  </div>
</template>
<script lang="ts" setup>
const { data: blogs } = await useAsyncData('blogs', () => queryContent('blog').only(['_path', 'title', 'description', 'tags', 'thumbnail', 'createdAt', 'updatedAt', 'draft']).where({ draft: false }).find())

useHead({
  title: 'ブログ一覧'
})
</script>
<style module>
.root {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>