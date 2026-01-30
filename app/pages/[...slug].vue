<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => queryCollection('pages').path(route.path).first())

</script>
<template>
  <main>
    <div v-if="page">
      <ContentRenderer :value="page" />
    </div>
    <div v-else>
        <h1>404 Not Found</h1>
        <p>アクセスしたページが見つかりませんでした。</p>
    </div>
  </main>
</template>
<style>
  h2 {
    text-decoration: none;
  }
  main {
    width: 100%;
  }
</style>