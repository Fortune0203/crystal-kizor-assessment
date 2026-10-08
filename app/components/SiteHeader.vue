<script setup lang="ts">
const links = [
  { href: '#about', label: 'About' },
  { href: '#ecosystem', label: 'Ecosystem' },
  { href: '#work', label: 'Work' },
  { href: '#ideas', label: 'Speaking & Ideas' },
  { href: '#impact', label: 'Impact' },
]

const open = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

watch(open, (value) => {
  document.documentElement.style.overflow = value ? 'hidden' : ''
})

function close() {
  open.value = false
}
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled || open, 'is-open': open }">
    <div class="container bar">
      <a href="#top" class="logo" aria-label="Crystal Kizor — back to top" @click="close">
        <BrandMark variant="monogram" class="logo__mono" />
        <BrandMark variant="horizontal" class="logo__text" />
      </a>

      <nav class="nav" aria-label="Primary">
        <a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
      </nav>

      <a href="#enquire" class="btn cta" data-umami-event="header-cta">Work with Crystal</a>

      <button
        class="toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        @click="open = !open"
      >
        <span class="visually-hidden">{{ open ? 'Close menu' : 'Open menu' }}</span>
        <span class="toggle__line toggle__line--top" />
        <span class="toggle__line toggle__line--mid" />
        <span class="toggle__line toggle__line--bot" />
      </button>
    </div>

    <div id="mobile-menu" class="drawer" :hidden="!open">
      <nav class="container drawer__nav" aria-label="Mobile">
        <a v-for="link in links" :key="link.href" :href="link.href" class="display" @click="close">
          {{ link.label }}
        </a>
        <a href="#enquire" class="btn" data-umami-event="mobile-menu-cta" @click="close">Work with Crystal</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  transition:
    background 0.4s var(--ease),
    box-shadow 0.4s var(--ease);
}

.header.is-scrolled {
  background: rgb(246 241 234 / 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 var(--line);
}

.bar {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: var(--header-h);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  color: var(--ink);
  text-decoration: none;
  margin-right: auto;
}

.logo__mono {
  width: 34px;
}

.logo__text {
  width: 150px;
}

.nav {
  display: none;
  gap: 2rem;
}

.nav a {
  position: relative;
  font-size: 0.875rem;
  text-decoration: none;
  color: var(--ink-2);
  transition: color 0.25s var(--ease);
}

.nav a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s var(--ease);
}

.nav a:hover {
  color: var(--ink);
}

.nav a:hover::after {
  transform: scaleX(1);
}

.cta {
  display: none;
  min-height: 42px;
  padding: 0.6rem 1.15rem;
  font-size: 0.85rem;
}

.toggle {
  position: relative;
  width: 44px;
  height: 44px;
  margin-right: -10px;
  border: 0;
  background: none;
  cursor: pointer;
}

.toggle__line {
  position: absolute;
  left: 11px;
  width: 22px;
  height: 1.5px;
  background: var(--ink);
  transition:
    transform 0.35s var(--ease),
    opacity 0.2s var(--ease);
}

.toggle__line--top {
  top: 15px;
}

.toggle__line--mid {
  top: 21px;
}

.toggle__line--bot {
  top: 27px;
}

/* Open: outer lines cross into an X, middle line fades out */
.is-open .toggle__line--top {
  transform: translateY(6px) rotate(45deg);
}

.is-open .toggle__line--mid {
  opacity: 0;
}

.is-open .toggle__line--bot {
  transform: translateY(-6px) rotate(-45deg);
}

.drawer {
  height: calc(100dvh - var(--header-h));
  background: var(--paper);
  border-top: 1px solid var(--line);
  overflow-y: auto;
}

.drawer__nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-block: 2rem;
}

.drawer__nav a.display {
  padding-block: 0.5rem;
  font-size: 2.25rem;
  text-decoration: none;
  border-bottom: 1px solid var(--line);
}

.drawer__nav .btn {
  margin-top: 2rem;
}

@media (max-width: 420px) {
  .logo__text {
    display: none;
  }
}

@media (min-width: 1024px) {
  .nav,
  .cta {
    display: flex;
  }

  .toggle,
  .drawer {
    display: none;
  }
}
</style>
