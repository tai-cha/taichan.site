<template>
  <div :class="$style.container" @click="onClick">
    <Icon name="simple-icons:misskey" color="#fff"></Icon>
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
  window.open(`https://misskey-hub.net/share/?text=${encodeURIComponent(props.text)}&url=${encodeURIComponent(props.url)}&manualInstance=mi.taichan.site`, '_blank', 'popup, noopener');
}
</script>
<style module>
.container {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #9ec233;
  width: 48px;
  height: 48px;
  font-size: 22px;
  cursor: pointer;
}
</style>