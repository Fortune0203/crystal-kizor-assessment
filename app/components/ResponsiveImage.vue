<script setup lang="ts">
import manifest from '~/assets/images.json'

type ImageName = keyof typeof manifest

const props = withDefaults(
  defineProps<{
    name: ImageName
    alt: string
    sizes?: string
    priority?: boolean
  }>(),
  { sizes: '100vw', priority: false },
)

const image = computed(() => manifest[props.name])
const srcset = (ext: string) =>
  image.value.widths.map((w) => `/images/${props.name}-${w}.${ext} ${w}w`).join(', ')
const fallback = computed(() => {
  const w = image.value.widths.find((x) => x >= 800) ?? image.value.widths.at(-1)
  return `/images/${props.name}-${w}.webp`
})
</script>

<template>
  <picture>
    <source type="image/avif" :srcset="srcset('avif')" :sizes="sizes" />
    <source type="image/webp" :srcset="srcset('webp')" :sizes="sizes" />
    <img
      :src="fallback"
      :alt="alt"
      :width="image.width"
      :height="image.height"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      decoding="async"
    />
  </picture>
</template>
