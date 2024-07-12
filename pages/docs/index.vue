<template>
  <div :class="$style.container">
    <h1>ドキュメント一覧</h1>
    <ul>
      <li v-for="doc in docs">
        <NuxtLink :to="doc._path">{{ doc.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
const { data: docs } = await useAsyncData('docs', () => queryContent('docs').only(['_path', 'title', 'draft']).where({ draft: false }).find())

useHead({
  title: 'ドキュメント一覧'
})
</script>
<style module>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>