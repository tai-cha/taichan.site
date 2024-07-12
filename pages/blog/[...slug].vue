<script lang="ts" setup>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
const showDate = (dateString: string) => new Date(Date.parse(dateString)).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

const runtimeConfig = useRuntimeConfig()

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'ページが見つかりません' })
}

useSeoMeta({
  ogTitle: page.value.title,
  description: page.value.description,
  ogType: 'article',
  ogImage: `${runtimeConfig.baseUrl}${page.value.thumbnail}`,
  articlePublishedTime: page.value.createdAt,
  articleModifiedTime: page.value.updatedAt,
  twitterCard: 'summary_large_image',
  robots: page.value.noindex ? 'noindex' : undefined,
})
</script>
<template>
  <main>
    <ContentDoc>
      <template v-slot="{ doc }">
        <h1>{{ doc.title }}</h1>
        <time :class="$style.createdAt" :datetime="doc.createdAt">{{ showDate(doc.createdAt) }}</time>
        <time v-if="doc.updatedAt != null && doc.createdAt !== doc.updatedAt" :class="$style.updatedAt" :datetime="doc.createdAt">{{ showDate(doc.updatedAt) }}</time>
        <ContentRenderer :value="doc" />
      </template>
      <template #not-found>
        <h1>404 Not Found</h1>
        <p>アクセスしたページが見つかりませんでした。</p>
      </template>
      <template #empty>
        <h1>Empty</h1>
        <p>このページは空です</p>
      </template>
    </ContentDoc>
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
    &::before {
      content: '公開日: ';
    }
    display: inline-block;
    width: 100%;
    text-align: right;
    font-size: 0.8em;
    color: var(--text-normal);
  }

  .updatedAt {
    &::before {
      content: '更新日: ';
    }
    display: inline-block;
    width: 100%;
    text-align: right;
    font-size: 0.8em;
    color: var(--text-normal);
  }
</style>