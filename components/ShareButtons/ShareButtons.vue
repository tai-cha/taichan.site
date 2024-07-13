<template>
  <div :class="$style.container">
    <span :class="$style.label">シェアする？</span>
    <div :class="$style.buttons">
      <ShareToX v-bind="shareInfo" />
      <ShareToLine v-bind="shareInfo" />
      <ShareToMastodon v-bind="shareInfo" />
      <ShareToMisskey v-bind="shareInfo" />
      <ShareToClipBoard v-if="enableClipboard" v-bind="shareInfo" />
      <ShareByNavigator v-bind="shareInfo" />
    </div>
  </div>
</template>
<script lang="ts" setup>
// #region import
import ShareToX from './ShareToX.vue';
import ShareToMisskey from './ShareToMisskey.vue';
import ShareToMastodon from './ShareToMastodon.vue';
import ShareToLine from './ShareToLine.vue';
import ShareByNavigator from './ShareByNavigator.vue';
import ShareToClipBoard from './ShareToClipBoard.vue';
// #endregion

const props = withDefaults(defineProps<{
  url?: string;
  title?: string;
  text?: string;
  enableClipboard?: boolean;
}>(),{
  enableClipboard: false
});

const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const currentUrl = `${runtimeConfig.public.baseUrl}${route.fullPath}`;
const shareInfo = {
  title: props.title ?? '',
  text: props.text ?? route.meta.title as string ?? 'taichanのサイト',
  url: props.url ?? currentUrl,
}

</script>
<style module>
.container {
  box-sizing: border-box;
  width: 100%;
  margin: 20px 0 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label {
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  width: 100%;
  text-align: center;
}

.buttons {
  border: 2px solid var(--accent);
  box-sizing: padding-box;
  display: flex;
  gap: min(8px, 5%);
  justify-content: center;
  width: max(30%, 350px);
  padding: 8px;
}
</style>