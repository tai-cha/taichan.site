<template>
  <DefaultLayout :pageClass="$style.page" :content-class="$style.pageContent">
    <slot />
    <template #after-page>
      <aside :class="$style.content">
        <!-- <div style="width: 300px;height: 200px;">300px * 200px</div> -->
        <Toc></Toc>
      </aside>
    </template>
  </DefaultLayout>
</template>
<script lang="ts" setup>
import type { ParsedContent } from '@nuxt/content';
provide('page', ref<ParsedContent | undefined>(undefined));
import DefaultLayout from './default.vue';

</script>
<style module>
.page {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.pageContent {
  flex-grow: 1;
}

.content {
  position: sticky;
  top: 75px;
  background-color: rgba(var(--bg-sub-rgb), 0.55);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  margin: 12px 16px 12px 0px;
  padding: 4px 16px 4px;

  align-self: flex-start;

  flex-basis: max(250px, 20%);
  flex-shrink: 0;
}

@media screen and (max-width: 960px) {
  .content {
    display: none;
  }
}
</style>