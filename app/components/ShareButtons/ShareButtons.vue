<template>
  <div :class="$style.container">
    <span :class="labelClasses">シェアする？</span>
    <div :class="containerClasses">
      <ShareToX v-bind="shareInfo" />
      <ShareToLine v-bind="shareInfo" />
      <ShareToMastodon v-bind="shareInfo" />
      <ShareToMisskey v-bind="shareInfo" />
      <ShareToClipBoard v-if="enableClipboard" v-bind="shareInfo" />
      <ShareByNavigator v-if="enableNavigator" v-bind="shareInfo" />
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
  enableNavigator?: boolean;
  withBorder?: boolean;
  withLabel?: boolean;
}>(),{
  enableClipboard: true,
  enableNavigator: false,
  withLabel: true,
  withBorder: true,
});

const $style = useCssModule()

const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const currentUrl = `${runtimeConfig.public.baseUrl}${route.fullPath}`;
const shareInfo = {
  title: props.title ?? '',
  text: props.text ?? route.meta.title as string ?? 'taichanのサイト',
  url: props.url ?? currentUrl,
}

const containerClasses = computed(() => ({
  [$style.buttons] : true,
  [$style.border]: props.withBorder,
}));

const labelClasses = computed(() => ({
  [$style.label]: true,
  [$style['display-none']] : !props.withLabel,
}));

</script>
<style module>
.container {
  box-sizing: border-box;
  width: 100%;
  margin: 20px 0 12px;
  padding: 16px 0;
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

.display-none {
  display: none;
}

.buttons {
  box-sizing: border-box;
  display: grid;
  gap: 8px;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  padding: 8px;

  &.border {
    border: 2px solid var(--accent);
  }
}

@media screen and (max-width: 600px) {
  .container {
    padding: 16px 0;
  }
  .buttons {
    padding: 4px;
  }
}
</style>