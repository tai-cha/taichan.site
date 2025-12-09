<script lang="ts" setup>
import type { NewsCollectionItem } from '@nuxt/content';

const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => queryCollection('news').path(route.path).first())
const showDate = (dateString: string) => new Date(Date.parse(dateString)).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

const runtimeConfig = useRuntimeConfig()

if (!page.value) {
  throw createError({ statusCode: 404, message: 'ページが見つかりません' })
}

const post = page.value

;(inject('page') as Ref<NewsCollectionItem | undefined>).value = post

const { getThumbnail } = useArticleThumbnail()
const thumbnail = getThumbnail(post.path, post.thumbnail)

useSeoMeta({
  ogTitle: post.title,
  description: post.description,
  ogType: 'article',
  ogImage: `${runtimeConfig.public.baseUrl}${thumbnail}`,
  articlePublishedTime: post.createdAt,
  articleModifiedTime: post.updatedAt,
  twitterCard: 'summary_large_image',
  twitterImage: `${runtimeConfig.public.baseUrl}${thumbnail}`,
  robots: post.noindex ? 'noindex' : undefined,
})

if (!post.thumbnail || post.thumbnail === '/default-ogp.png') {
  defineOgImageComponent('Default', {
    title: post.title,
    category: 'NEWS',
  })
}

</script>
<template>
  <main>
    <div v-if="page">
        <h1 id="title">{{ page.title }}</h1>
        <span :class="$style.createdAt">公開日: <time :datetime="page.createdAt">{{ showDate(page.createdAt) }}</time></span>
        <span v-if="page.updatedAt != null && page.createdAt !== page.updatedAt" :class="$style.updatedAt">更新日: <time v-if="page.updatedAt != null && page.createdAt !== page.updatedAt" :datetime="page.createdAt">{{ showDate(page.updatedAt) }}</time></span>
        <ContentRenderer :value="page" />
        <hr :class="$style.endingHR">
        <div>
          タグ: <span v-for="tag in page.tags" :class="$style.tag">{{ tag }}</span>
        </div>
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

  .tag {
    background-color: var(--bg);
    color: var(--text-normal);
    padding: 4px 8px;
    margin: 4px;
    border-radius: 8px;
  }
</style>