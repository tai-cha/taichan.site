<script lang="ts" setup>
import { inject } from 'vue';

const colorScheme = inject('colorScheme') as Ref<'light'|'dark'>;

const toggleTheme = () => {
  colorScheme.value = colorScheme.value === 'light' ? 'dark' : 'light';

  if (colorScheme.value === 'light') {
    useHtmlClass().replaceClass('theme-dark', 'theme-light');
  } else {
    useHtmlClass().replaceClass('theme-light', 'theme-dark');
  }
};

const isLight = computed(() => colorScheme.value === 'light');
</script>
<template>
  <div>
    <button v-show="isLight" :class="$style.toggleSwitch" @click="toggleTheme"><Icon name="ph-moon-fill" /></button>
    <button v-show="!isLight" :class="$style.toggleSwitch" @click="toggleTheme"><Icon name="ph-sun-fill" /></button>
  </div>
</template>
<style module>
.toggleSwitch {
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
}
</style>