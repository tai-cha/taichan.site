<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';

const $style = useCssModule();

const props = withDefaults(defineProps<{
  direction?: 'row' | 'column',
  gap?: string
  inherit? : boolean,
  forBanners?: boolean
}>(), {
  direction: 'row',
  gap: "initial",
  inherit: true,
  forBanners: false
});

const classes = computed(() => [
  $style.container,
  ...(props.inherit ? [$style.inherit] : []),
  ...(props.forBanners ? [$style.forBanners] : [])
]);

</script>
<style module>

.container {
  display: flex;
  gap: v-bind(gap);
  flex-direction: v-bind(direction);
  flex-wrap: wrap;
}

.container.inherit {
  & > * {
    display: flex;
    gap: v-bind(gap);
    flex-direction: v-bind(direction);
    flex-wrap: wrap;
  }
}

.container.forBanners {
  & img {
    min-height: 60px;
  }
}

</style>