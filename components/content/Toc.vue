<template>
  <div :class="$style.root">
    <h2 :class="$style.title">目次</h2>
    <ul v-if="links">
      <li>
        <a v-if="title" href="#title" :class="anchorClass('title')">{{ title }}</a>
        <ul>
          <li v-for="item in links">
            <a :href="`#${item.id}`" :class="anchorClass(item.id)">{{ item.text }}</a>
            <ul v-if="item.children">
              <li v-for="child in item.children">
                <a :href="`#${child.id}`" :class="anchorClass(item.id)">{{ child.text }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <div v-else>目次は利用できません。</div>
  </div>
</template>
<script lang="ts" setup>
import type { ParsedContent, TocLink } from '@nuxt/content';

const {
  activeHeadings,
  updateHeadings,
} = useScrollSpy()

const route = useRoute();
const links = ref<TocLink[] | undefined>();
const title = ref<string | undefined>();

const provided = inject('page') as Ref<ParsedContent | undefined>;

if (provided.value != null && provided.value._path == route.path) {
  title.value = provided.value.title;
  links.value = provided.value.toc.links;
} else {
  const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
  title.value = page.value?.title;
  links.value = page.value?.body?.toc?.links
}

const headingElems = ref<Element[]>([]);

onMounted(() => {
  setTimeout(() => {
    headingElems.value = Array.from([...document.querySelectorAll('.container h1, .container h2, .container h3, .container h4')]);
    updateHeadings(headingElems.value);
  }, 1000);
});

function isActive(id: string) {
  return activeHeadings.value.includes(id);
}

function anchorClass(id: string) {
  return isActive(id) ? 'active' : '';
}

</script>
<style module>
  .root {
    padding: 12px 0;

    a {
      color: rgba(var(--text-normal-rgb), 0.7);
      text-decoration: none;
    }

    a:global(.active) {
      color: var(--text-normal-rgb);
    }
  }
  .title {
    margin: 0.5rem 0;
  }
</style>