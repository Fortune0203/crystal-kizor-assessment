<script setup lang="ts">
import { intents } from '~/data/ecosystem'

const { start } = useEnquiry()

const credentials = [
  { value: 'Lead Principal', label: 'Studio COKA, Enugu' },
  { value: 'Off-grid', label: 'Designer of Nigeria’s first off-grid hospital' },
  { value: 'TEDx', label: 'Speaker, TEDxPortHarcourt 2025' },
]
</script>

<template>
  <section id="top" class="hero">
    <div class="container grid">
      <div class="copy">
        <p class="eyebrow rise">Architect · Designer · Educator · Founder</p>

        <h1 class="display h-xl title rise" style="--rise-delay: 80ms">
          Rooted in place.<br />
          <em>Designed for people.</em>
        </h1>

        <p class="lead rise" style="--rise-delay: 160ms">
          Crystal Kizor is an architect and designer based in Enugu, Nigeria. Through a design-and-build studio, a
          furniture brand, an education platform and two community initiatives, she is working on one question:
          <strong>how do we build a better, climate-responsive future for African cities — and the people in them?</strong>
        </p>

        <div class="actions rise" style="--rise-delay: 240ms">
          <a href="#ecosystem" class="btn" data-umami-event="hero-explore">
            Explore her work <span class="arrow" aria-hidden="true">→</span>
          </a>
          <a href="#enquire" class="btn btn--ghost" data-umami-event="hero-contact">Start a conversation</a>
        </div>

        <div class="routes rise" style="--rise-delay: 320ms">
          <p class="routes__label">I’m here to…</p>
          <ul class="routes__list">
            <li v-for="item in intents.slice(0, 6)" :key="item.id">
              <button type="button" class="chip" @click="start(item.id, 'hero')">{{ item.goal }}</button>
            </li>
          </ul>
        </div>
      </div>

      <figure class="portrait rise" style="--rise-delay: 120ms">
        <ResponsiveImage
          name="crystal-hero"
          alt="Crystal Kizor leaning on a stone desk in her architecture studio, project drawings pinned behind her"
          sizes="(min-width: 1024px) 40vw, 100vw"
          priority
        />
        <figcaption>
          <BrandMark variant="signature" class="signature" />
        </figcaption>
      </figure>
    </div>

    <div class="container">
      <ul class="credentials" aria-label="Highlights">
        <li v-for="item in credentials" :key="item.value" class="rise">
          <span class="display">{{ item.value }}</span>
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: calc(var(--header-h) + clamp(2rem, 5vw, 4rem));
  padding-bottom: clamp(3rem, 6vw, 5rem);
  overflow: hidden;
}

.grid {
  display: grid;
  gap: 3rem;
}

.copy {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  align-self: center;
}

.title {
  max-width: 14ch;
}

.lead strong {
  font-weight: 500;
  color: var(--ink);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.routes {
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}

.routes__label {
  margin-bottom: 0.85rem;
  font-size: 0.8rem;
  color: var(--ink-3);
}

.routes__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.chip {
  min-height: 40px;
  padding: 0.5rem 0.95rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  font-size: 0.85rem;
  cursor: pointer;
  transition:
    background 0.25s var(--ease),
    border-color 0.25s var(--ease),
    color 0.25s var(--ease);
}

.chip:hover {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--paper);
}

.portrait {
  position: relative;
  align-self: start;
  margin: 0;
}

.portrait :deep(img) {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: 50% 20%;
}

.portrait figcaption {
  position: absolute;
  right: -0.5rem;
  bottom: 1.25rem;
  padding: 0.9rem 1.25rem;
  background: var(--paper);
  color: var(--ink);
}

.signature {
  width: 150px;
}

.credentials {
  display: grid;
  gap: 1.25rem;
  margin: clamp(3rem, 6vw, 5rem) 0 0;
  padding: 2rem 0 0;
  list-style: none;
  border-top: 1px solid var(--line);
}

.credentials li {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.875rem;
  color: var(--ink-2);
}

.credentials .display {
  font-size: 1.6rem;
  color: var(--ink);
}

@media (min-width: 720px) {
  .credentials {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: 1.15fr 0.85fr;
    gap: clamp(3rem, 6vw, 6rem);
  }

  .portrait :deep(img) {
    aspect-ratio: 3 / 4;
    max-height: calc(100vh - var(--header-h) - 3rem);
  }

  .portrait figcaption {
    right: auto;
    left: -2.5rem;
  }
}
</style>
