<script lang="ts" setup>
import { inject } from 'vue';
import { useHtmlClass } from '~/composables/useHtmlClass';

const colorScheme = inject('colorScheme') as Ref<'light'|'dark'>;

const toggleTheme = () => {
  colorScheme.value = colorScheme.value === 'light' ? 'dark' : 'light';

  if (colorScheme.value === 'light') {
    useHtmlClass().replaceClass('theme-dark', 'theme-light');
  } else {
    useHtmlClass().replaceClass('theme-light', 'theme-dark');
  }
};

const buttonIconName = computed(() => colorScheme.value === 'light' ? 'ph:moon-fill' : 'ph-sun-fill');
</script>
<template>
  <div>
    <button :class="$style.toggleSwitch" @click="toggleTheme"><Icon :name="buttonIconName" /></button>
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