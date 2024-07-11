import { ref, watchEffect } from 'vue';

export function useHtmlClass() {
  const classes = ref<Set<string>>(new Set());

  const addClass = (className: string) => {
    classes.value.add(className);
  };

  const removeClass = (className: string) => {
    classes.value.delete(className);
  };

  const getClasses = () => {
    return Array.from(classes.value);
  };

  watchEffect(() => {
    document.documentElement.className = Array.from(classes.value).join(' ');
  });

  return { addClass, removeClass, getClasses };
}