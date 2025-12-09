<script lang="ts" setup>
import type { BlogCollectionItem } from '@nuxt/content';

const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => queryCollection('blog').path(route.path).first())
const showDate = (dateString: string) => new Date(Date.parse(dateString)).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

const runtimeConfig = useRuntimeConfig()

if (!page.value) {
  throw createError({ statusCode: 404, message: 'ページが見つかりません' })
}

const post = page.value

;(inject('page') as Ref<BlogCollectionItem | undefined>).value = post

useSeoMeta({
  ogTitle: post.title,
  description: post.description,
  ogType: 'article',
  ogImage: `${runtimeConfig.public.baseUrl}${post.thumbnail}`,
  articlePublishedTime: post.createdAt,
  articleModifiedTime: post.updatedAt,
  twitterImage: `${runtimeConfig.public.baseUrl}${post.thumbnail}`,
  twitterCard: 'summary_large_image',
  robots: post.noindex ? 'noindex' : undefined,
})

definePageMeta({
  layout: 'article'
});

useJsonld({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.description,
  datePublished: post.createdAt,
  dateModified: post.updatedAt,
  author: [{
    '@type': 'Person',
    name: 'taichan'
  }],
})

</script>
<template>
  <main>
    <div v-if="page">
        <h1 id="title">{{ page.title }}</h1>
        <span :class="$style.createdAt">公開日: <time :datetime="page.createdAt">{{ showDate(page.createdAt) }}</time></span>
        <span v-if="page.updatedAt != null && page.createdAt !== page.updatedAt" :class="$style.updatedAt">更新日: <time v-if="page.updatedAt != null && page.createdAt !== page.updatedAt" :datetime="page.createdAt">{{ showDate(page.updatedAt) }}</time></span>
        <ContentRenderer :value="page" />
        <div :class="$style.tags">
          タグ: <NuxtLink v-for="tag in page.tags" :to="`/blog/tags/${tag}`" :class="$style.tag">{{ tag }}</NuxtLink>
        </div>
        <hr :class="$style.endingHR">
        <ShareButtons :text="`${page.title} | taichanのサイト`" />
    </div>
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