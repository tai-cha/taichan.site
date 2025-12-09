<script lang="ts" setup>
const route = useRoute();
const { data } = await useAsyncData(
  route.path,
  () => queryCollection('blog').select('tags').all()
)

const tags = new Set(data.value?.map((page) => page.tags).flat() || [])

useSeoMeta({
  ogTitle: `ブログ記事のタグ一覧`,
  description: `ブログ記事のタグ一覧です。`,
})

</script>
<template>
  <main :class="$style.root">
    <h1>ブログ記事のタグ一覧</h1>
    <ul>
      <li v-for="tag in tags">
        <NuxtLink :to="`/blog/tags/${tag}`" class="tag">{{ tag }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>
<style module>
.root {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>