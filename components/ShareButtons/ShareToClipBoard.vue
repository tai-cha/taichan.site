<template>
  <div :class="$style.container" @click="onClick">
    <Icon name="ph:clipboard-bold"></Icon>
    <div :class="tooltipClass">{{ tooltipText }}</div>
  </div>
</template>
<script lang="ts" setup>
const copiedShowing = ref(false);
const tooltipText = computed(() => copiedShowing.value ? 'コピーしました' : 'コピー');
const tooltipClass = computed(() => [
  $style.tooltip,
  ...(copiedShowing.value ? [$style.show] : [])
]);
const $style = useCssModule();
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
  navigator.clipboard.writeText(props.url);
  copiedShowing.value = true;
  setTimeout(() => {
    copiedShowing.value = false;
  }, 1500);
}

</script>
<style module>
.container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(var(--accent-rgb), 0.65);
  width: 48px;
  height: 48px;
  font-size: 22px;
  cursor: pointer;
  flex-shrink: 0;
}

.tooltip {
  position: absolute;
  display: none;
  top: -30px;
  left: 0;
  background: rgba(var(--text-link-rgb), 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  text-wrap: nowrap;

  &.show {
    display: block;
    left: -50%;
  }
}
</style>