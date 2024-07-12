<template>
  <div :class="$style.container">
    <span :class="$style.label"><Icon :style="$style.icon" :name="selectedNotice.icon" />{{ selectedNotice.text }}</span>
    <div :class="$style.contents">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
type NoticeType = 'hint' | 'alert' | 'info' | 'warning' | 'disclaimer'
const props = withDefaults(defineProps<{
  type: NoticeType
}>(),{
  type: 'info'
})

type NoticeInfo = Record<NoticeType, { icon: string, text: string, color?: string }>

const noticeInfo : NoticeInfo = {
  hint: { icon: 'ic:baseline-lightbulb', text: 'ヒント'},
  alert: { icon: 'ic:round-error-outline', text: '警告', color: 'var(--alert)'},
  info: { icon: 'uil:info-circle', text: '情報'},
  warning: { icon: 'ph:warning-bold', text: '注意', color: 'var(--warning)'},
  disclaimer: { icon: 'ic:round-warning', text: '免責事項', color: 'var(--warning)' }
}

const selectedNotice = computed(() => noticeInfo[props.type] ?? noticeInfo.info)
const color = computed(() => selectedNotice.value.color || 'var(--accent)')
const borderColor = computed(() => selectedNotice.value.color || 'var(--accent)')

</script>
<style module>
.container {
  display: block;
  background-color: rgba(var(--bg-sub-rgb), 0.3);
  border: 2px solid v-bind(borderColor);
  border-radius: 8px;
  padding: 0 0 8px 0;
  margin: 16px 0;
}

.icon {
  display: inline-block;
  font-size: 1.5rem;
}

.label {
  box-sizing: border-box;
  /* background: var(--text-sub); */
  border-radius: 8px 8px 0 0;
  width: 100%;
  display: flex;
  align-items: center;
  color: v-bind(color);
  vertical-align: center;
  font-weight: 700;
  line-height: 1;
  gap: 0.2em;
  padding: 8px 4px;
  z-index: 0;
}

.contents {
  padding: 4px;

  & > p {
    margin: 4px 0 0;
  }
}
</style>
