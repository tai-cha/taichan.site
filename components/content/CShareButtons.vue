// Just a wrapper component for ~/components/ShareButtons.vue will be used in markdown components.
<template>
  <ShareButtons v-vind="props" />
</template>
<script lang="ts" setup>
const props = withDefaults(defineProps<{
  url?: string;
  title?: string;
  text?: string;
  enableClipboard?: boolean;
}>(),{
  enableClipboard: false
});
</script>
