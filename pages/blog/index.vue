<template>
  <div>
    <div v-for="page in blog">
      <NuxtLink :to="page._path">{{ page.title }} {{ page.createdAt }}</NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
const { data: blog } = await useAsyncData('blog', () => queryContent('blog').only(['_path', 'title', 'createdAt', 'updatedAt', 'draft']).where({ draft: false }).find())

useHead({
  title: 'ブログ一覧'
})
</script>