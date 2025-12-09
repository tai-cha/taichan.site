<script setup lang="ts">
// Black 1x1 pixel base64 placeholder
// Image path updated in template


defineProps<{
  title: string
  category?: string
}>()
</script>

<template>
  <div class="w-full h-full flex items-center justify-center py-[27px] px-9" style="background: linear-gradient(105deg, #A7CCD3 -39%, #1DACB6 161%);">
    <div class="w-full h-full flex flex-col pt-[29px] pb-[35px] pl-10 pr-7 rounded-2xl bg-[#eeeeee]/60">
      <div class="flex-grow flex flex-col justify-between w-full">
        <!-- Title Section -->
        <h1 class="font-bold text-[56px] leading-[1.6] text-[#5F5F5F] m-0 break-words whitespace-pre-wrap" style="font-family: 'BIZ UDPGothic', sans-serif;">
          {{ title }}
        </h1>

        <!-- Footer Section -->
        <div class="flex flex-row items-center justify-end w-full gap-6">
          <img src="/img/tai-cha_icon.png" alt="icon" class="w-[94px] h-[94px] rounded-lg object-cover block" />
          <div class="font-normal text-[51px] leading-[76px] tracking-[-0.11em] text-[#5F5F5F]" style="font-family: 'KodomoRounded', sans-serif;">
            taichanのサイト
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
