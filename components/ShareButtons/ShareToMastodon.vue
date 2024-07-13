<template>
  <div :class="$style.container" @click="onClick">
    <Icon name="simple-icons:mastodon" color="#fff"></Icon>
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
  window.open(`https://donshare.net/share.html?text=${encodeURIComponent(props.text)}&url=${encodeURIComponent(props.url)}`, '_blank', 'popup, noopener');
}
</script>
<style module>
.container {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #615ff9;
  width: 48px;
  height: 48px;
  font-size: 22px;
  cursor: pointer;
}
</style>