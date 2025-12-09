<template>
  <article v-for="page in props.pages">
    <div :class="$style.pageLink" @click="router.push(page.path)" role="link">
      <div :class="[$style.imgContainer, { [$style.loaded]: loadedImages.has(page.path) }]"><img :src="getThumbnail(page.path, page.thumbnail)" :alt="page.title" @error="onImageError" @load="onImageLoad(page.path)" /></div>
      <div :class="$style.details">
        <div :class="$style.title">{{ page.title }}</div>
        <div :class="$style.description">{{ page.description }}</div>
        <div v-if="page.tags" :class="$style.tags">タグ: <NuxtLink v-for="tag in page.tags" :to="`/blog/tags/${tag}`" :class="$style.tag" @click.stop>{{ tag }}</NuxtLink></div>
        <div :class="$style.createdAt"><time :datetime="page.createdAt">{{ showDate(page.createdAt) }}</time></div>
      </div>
    </div>
  </article>
  <div v-if="props.pages == null || props.pages.length === 0">記事はありません</div>
</template>
<script lang="ts" setup>
import type { BlogCollectionItem } from '@nuxt/content';

export type ListContent = Pick<BlogCollectionItem, "tags" | "title" | "description" | "path" | "thumbnail" | "createdAt" | "updatedAt" | "draft">;

const props = defineProps<{
  pages?: ListContent[] | null
}>()

const router = useRouter()

const showDate = (dateString: string) => new Date(Date.parse(dateString)).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

const { getThumbnail } = useArticleThumbnail()

const loadedImages = ref(new Set<string>())

const onImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  if (target.src.includes('default-ogp.png')) return // Prevent infinite loop
  target.src = '/default-ogp.png'
}

const onImageLoad = (path: string) => {
  loadedImages.value.add(path)
}
</script>
<style module>
.pageLink {
  background-color: rgba(var(--bg-sub-rgb), 0.45);
  display: flex;
  margin: 20px 0;
  font-size: 20px;
  color: var(--text-normal);
  text-decoration: none;
  border-radius: 8px;
  cursor: pointer;
}
.imgContainer {
  &:empty::before {
    position: absolute;
    content: 'No Image';
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  align-self: center;
  position: relative;
  background-color: rgba(var(--text-normal-rgb), 0.5);
  background-image: url('/default-ogp.png');
  background-size: cover;
  background-position: center;
  /* 1200 * 630 -> 400 * 210 (1/3 x) */
  flex-basis: 400px;
  flex-shrink: 0;
  width: 400px;
  height: 210px;
  border-radius: 8px 0 0 8px;
  margin-right: 4px;
  line-height: 100%;

  & > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px 0 0 8px;
  }
}

.loaded {
  background-image: none !important;
  background-color: transparent !important;
}

.details {
  box-sizing: border-box;
  width: 100%;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  font-size: 24px;
  font-weight: 700;
}

.description {
  font-size: 14px;
  flex-grow: 1;
}

.createdAt {
  font-size: 14px;
  text-align: right;
}

.tag {
  background-color: var(--bg);
  color: var(--text-normal);
  padding: 4px 8px;
  margin: 4px;
  border-radius: 8px;
  text-decoration: none;
  line-height: 2.5;
  text-wrap: nowrap;
}

.tags {
  text-align: right;
  font-size: 14px;
}

/* Non PC */
@media screen and (max-width: 960px) {
  .pageLink {
    flex-direction: column;
    margin: 0 0 20px 0;
  }
  .imgContainer {
    flex-basis: 100%;
    width: 100%;
    height: auto;
    aspect-ratio: 1200 / 630;
    margin-right: 0;
    border-radius: 8px 8px 0 0;

    & > img {
      border-radius: 8px 8px 0 0;
    }
  }
}
</style>