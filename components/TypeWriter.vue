<template>
  <div>
    <p :class="$style.display">{{ displayText }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const props = defineProps<{ texts: string[] }>();

const currentIndex = ref(0);
const displayText = ref('');
const typingSpeed = 100; // タイピング速度 (ミリ秒)
const deletingSpeed = 50; // 削除速度 (ミリ秒)
const delayBetweenTexts = 4000; // テキスト間の遅延 (ミリ秒)

const typeText = async (text: string) => {
  for (let i = 0; i <= text.length; i++) {
    displayText.value = text.substring(0, i);
    await new Promise((resolve) => setTimeout(resolve, typingSpeed));
  }
};

const deleteText = async (text: string) => {
  for (let i = text.length; i >= 0; i--) {
    displayText.value = text.substring(0, i);
    await new Promise((resolve) => setTimeout(resolve, deletingSpeed));
  }
};

const startTextAnimation = async () => {
  while (true) {
    await typeText(props.texts[currentIndex.value]);
    await new Promise((resolve) => setTimeout(resolve, delayBetweenTexts));
    await deleteText(props.texts[currentIndex.value]);
    currentIndex.value = (currentIndex.value + 1) % props.texts.length;
  }
};

onMounted(() => {
  startTextAnimation();
});
</script>

<style module>
.display {
  &::after {
    color: rgba(var(--text-sub-rgb), 0.5);
    content: '▮';
    animation: blink 1s step-end infinite;
  }
  color: var(--text-sub);
  font-size: 20px;
  font-family: Arial, sans-serif;
  margin: 20px 0;
}

@keyframes blink {
  75% { opacity: 0.0; }
}
</style>