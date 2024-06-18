<template>
  <div>
    <div v-for="doc in docs">
      <NuxtLink :to="doc._path">{{ doc.title }}</NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
const { data: docs } = await useAsyncData('docs', () => queryContent('docs').only(['_path', 'title', 'draft']).where({ draft: false }).find())

useHead({
  title: 'ドキュメント一覧'
})
</script>
