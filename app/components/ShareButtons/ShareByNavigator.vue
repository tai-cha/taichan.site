<template>
  <div :class="$style.container" @click="onClick">
    <Icon name="ic:baseline-share"></Icon>
  </div>
</template>
<script lang="ts" setup>

const props = withDefaults(defineProps<{
  title?: string;
  text?: string;
  url: string;
}>(), {
  title: 'taichanのサイト',
  text: 'taichanのサイトです。',
  url: 'https://taichan.site/',
});

const onClick = () => {
  navigator.share(props);
}
</script>
<style module>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(var(--text-link-rgb), 0.5);
  width: 48px;
  height: 48px;
  font-size: 22px;
  cursor: pointer;
  flex-shrink: 0;
}
</style>