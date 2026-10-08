<script setup lang="ts">
// Crystal Kizor marks, extracted from the supplied logo sheet.
// Rendered as a CSS mask so the mark takes `currentColor` on light and dark backgrounds.
const props = defineProps<{ variant: 'wordmark' | 'monogram' | 'signature' | 'horizontal' }>()

const ratios = { wordmark: 754 / 332, monogram: 188 / 145, signature: 393 / 121, horizontal: 523 / 34 }
const style = computed(() => ({
  '--mark': `url(/brand/ck-${props.variant}.png)`,
  aspectRatio: String(ratios[props.variant]),
}))
</script>

<template>
  <span class="mark" :style="style" role="img" aria-label="Crystal Kizor" />
</template>

<style scoped>
.mark {
  display: block;
  background: currentColor;
  -webkit-mask: var(--mark) center / contain no-repeat;
  mask: var(--mark) center / contain no-repeat;
}
</style>
