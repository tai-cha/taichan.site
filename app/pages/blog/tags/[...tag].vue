<script lang="ts" setup>
const route = useRoute();
const tag = typeof route.params.tag === 'string' ? route.params.tag : route.params.tag?.[0]
const { data: pages } = await useAsyncData(
  route.path,
  () => queryCollection('blog').select('path', 'title', 'description', 'tags', 'thumbnail', 'createdAt', 'updatedAt', 'draft').where('tags', 'LIKE', `%"${tag}"%`).where('draft', '=', false).all()
)

if (tag == null || tag == '') {
  throw createError({ statusCode: 404, message: 'ページが見つかりません' })
}

useSeoMeta({
  ogTitle: `タグ「${tag}」のブログ記事`,
  description: `タグ「${tag}」のブログ記事一覧です。`,
})

</script>
<template>
  <main>
    <h1>タグ「{{ tag }}」のブログ記事</h1>
    <BlogList :pages="pages" />
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