<template>
  <main :class="$style.container">
    <h1>ドキュメント一覧</h1>
    <ul>
      <li v-for="doc in docs">
        <NuxtLink :to="doc.path">{{ doc.title }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>
<script lang="ts" setup>
const { data: docs } = await useAsyncData('docs', () => queryCollection('docs').select('path', 'title', 'draft').where('draft', '=', false).all())

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