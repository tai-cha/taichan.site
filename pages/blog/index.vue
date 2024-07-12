<template>
  <div :class="$style.root">
    <h1>ブログ記事一覧</h1>
    <article v-for="page in blogs">
      <a :class="$style.pageLink" :href="page._path">
        <div :class="$style.imgContainer"><NuxtImg v-if="page.thumbnail != null" :src="page.thumbnail" /></div>
        <div :class="$style.details">
          <div :class="$style.title">{{ page.title }}</div>
          <div :class="$style.description">{{ page.description }}</div>
          <div v-if="page.tags" :class="$style.tags">タグ: <span v-for="tag in page.tags" :class="$style.tag">{{ tag }}</span></div>
          <div :class="$style.createdAt"><time :datetime="page.createdAt">{{ showDate(page.createdAt) }}</time></div>
        </div>
      </a>
    </article>
  </div>
</template>
<script lang="ts" setup>
const { data: blogs } = await useAsyncData('blogs', () => queryContent('blog').only(['_path', 'title', 'description', 'tags', 'thumbnail', 'createdAt', 'updatedAt', 'draft']).where({ draft: false }).find())
const showDate = (dateString: string) => new Date(Date.parse(dateString)).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

useHead({
  title: 'ブログ一覧'
})
</script>
<style module>
.root {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.pageLink {
  background-color: rgba(var(--bg-sub-rgb), 0.45);
  display: flex;
  margin: 20px 0;
  font-size: 20px;
  color: var(--text-normal);
  text-decoration: none;
  border-radius: 8px;
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
  position: relative;
  background-color: rgba(var(--text-normal-rgb), 0.5);
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
    margin-right: 0;
    border-radius: 8px 8px 0 0;

    & > img {
      border-radius: 8px 8px 0 0;
    }
  }
}
</style>