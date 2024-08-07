<script lang="ts" setup>
import type { ParsedContent } from '@nuxt/content';

const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
const showDate = (dateString: string) => new Date(Date.parse(dateString)).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

const runtimeConfig = useRuntimeConfig()

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'ページが見つかりません' })
}

(inject('page') as Ref<ParsedContent | undefined>).value = page.value

useSeoMeta({
  ogTitle: page.value.title,
  description: page.value.description,
  ogType: 'article',
  ogImage: `${runtimeConfig.public.baseUrl}${page.value.thumbnail}`,
  articlePublishedTime: page.value.createdAt,
  articleModifiedTime: page.value.updatedAt,
  twitterImage: `${runtimeConfig.public.baseUrl}${page.value.thumbnail}`,
  twitterCard: 'summary_large_image',
  robots: page.value.noindex ? 'noindex' : undefined,
})

definePageMeta({
  layout: 'article'
});

useJsonld({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: page.value.title,
  description: page.value.description,
  datePublished: page.value.createdAt,
  dateModified: page.value.updatedAt,
  author: [{
    '@type': 'Person',
    name: 'taichan'
  }],
})

</script>
<template>
  <main>
    <ContentDoc>
      <template v-slot="{ doc }">
        <h1 id="title">{{ doc.title }}</h1>
        <span :class="$style.createdAt">公開日: <time :datetime="doc.createdAt">{{ showDate(doc.createdAt) }}</time></span>
        <span v-if="doc.updatedAt != null && doc.createdAt !== doc.updatedAt" :class="$style.updatedAt">更新日: <time v-if="doc.updatedAt != null && doc.createdAt !== doc.updatedAt" :datetime="doc.createdAt">{{ showDate(doc.updatedAt) }}</time></span>
        <ContentRenderer :value="doc" />
        <div :class="$style.tags">
          タグ: <NuxtLink v-for="tag in doc.tags" :to="`/blog/tags/${tag}`" :class="$style.tag">{{ tag }}</NuxtLink>
        </div>
        <hr :class="$style.endingHR">
        <ShareButtons :text="`${doc.title} | taichanのサイト`" />
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

  .tags {
    width: 100%;
    text-align: right;
  }

  .tag {
    background-color: var(--bg);
    color: var(--text-normal);
    padding: 4px 8px;
    margin: 4px;
    border-radius: 8px;
    text-decoration: none;
  }
</style>