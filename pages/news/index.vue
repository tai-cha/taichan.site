<template>
  <div>
    <div v-for="page in news">
      <NuxtLink :to="page._path">{{ page.title }} {{ page.createdAt }}</NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
const { data: news } = await useAsyncData('news', () => queryContent('news').only(['_path', 'title', 'createdAt', 'updatedAt', 'draft']).where({ draft: false }).find())

useHead({
  title: 'ニュース一覧'
})
</script>