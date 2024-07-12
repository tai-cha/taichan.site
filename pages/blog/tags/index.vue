<script lang="ts" setup>
const route = useRoute();
const { data } = await useAsyncData(
  route.path,
  () => queryContent('blog').only(['tags']).find()
)

const tags = new Set(data.value.map((page) => page.tags).flat())

useSeoMeta({
  ogTitle: `ブログ記事のタグ一覧`,
  description: `ブログ記事のタグ一覧です。`,
})

</script>
<template>
  <main>
    <h1>ブログ記事のタグ一覧</h1>
    <ul>
      <li v-for="tag in tags">
        <NuxtLink :to="`/blog/tags/${tag}`" class="tag">{{ tag }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>
<style module>
  h2 {
    text-decoration: none;
  }
  main {
    width: 100%;
  }

  .createdAt {
    display: inline-block;
    width: 100%;
    text-align: right;
    font-size: 0.8em;
    color: var(--text-normal);
  }

  .updatedAt {
    display: inline-block;
    width: 100%;
    text-align: right;
    font-size: 0.8em;
    color: var(--text-normal);
  }

  .endingHR {
    margin: 24px 0;
  }

  .tag {
    background-color: var(--bg);
    color: var(--text-normal);
    padding: 4px 8px;
    margin: 4px;
    border-radius: 8px;
  }
</style>