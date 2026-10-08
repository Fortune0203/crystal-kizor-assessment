<script setup lang="ts">
import { pillars } from '~/data/ecosystem'

const { start } = useEnquiry()
</script>

<template>
  <section id="ecosystem" class="section">
    <div class="container">
      <header class="intro">
        <p class="eyebrow" data-reveal>What she is building</p>
        <h2 class="display h-lg" data-reveal>
          Seven initiatives. <em>One idea of a better built environment.</em>
        </h2>
        <p class="lead" data-reveal>
          Each initiative tackles a different layer of the same problem: the spaces we live in, the people who design
          them, and the generation who will inherit them.
        </p>
      </header>

      <!-- The connecting thread: from spaces, to knowledge, to people -->
      <ol class="thread" aria-label="The three pillars" data-reveal>
        <li v-for="pillar in pillars" :key="pillar.id" :style="{ '--accent': pillar.accent }">
          <a :href="`#pillar-${pillar.id}`">
            <span class="thread__dot" aria-hidden="true" />
            <span class="thread__index">{{ pillar.index }}</span>
            <span class="thread__title">{{ pillar.title }}</span>
            <span class="thread__verb">{{ pillar.verb }}</span>
          </a>
        </li>
      </ol>

      <div class="pillars">
        <article
          v-for="pillar in pillars"
          :id="`pillar-${pillar.id}`"
          :key="pillar.id"
          class="pillar"
          :style="{ '--accent': pillar.accent }"
        >
          <header class="pillar__head" data-reveal>
            <span class="pillar__index">{{ pillar.index }}</span>
            <h3 class="display h-md">{{ pillar.title }}</h3>
            <p class="muted">{{ pillar.summary }}</p>
          </header>

          <ul class="brands">
            <li
              v-for="(brand, i) in pillar.brands"
              :key="brand.name"
              class="brand"
              :class="{ 'brand--flagship': brand.flagship }"
              data-reveal
              :style="{ '--reveal-delay': `${i * 90}ms` }"
            >
              <p class="brand__kind">{{ brand.kind }}</p>
              <h4 class="display brand__name">
                {{ brand.name }}
                <span v-if="brand.flagship" class="badge">Flagship</span>
              </h4>
              <p class="brand__desc">{{ brand.description }}</p>
              <p class="brand__audience">{{ brand.audience }}</p>
              <div class="brand__actions">
                <a
                  v-if="brand.href && brand.intent === 'press'"
                  :href="brand.href"
                  class="link"
                  target="_blank"
                  rel="noopener"
                  :data-umami-event="`outbound-${brand.name}`"
                >
                  {{ brand.cta }} <span aria-hidden="true">↗</span>
                </a>
                <button v-else type="button" class="link" @click="start(brand.intent, `ecosystem-${brand.name}`)">
                  {{ brand.cta }} <span aria-hidden="true">→</span>
                </button>
                <a
                  v-if="brand.href && brand.intent !== 'press'"
                  :href="brand.href"
                  class="link link--quiet"
                  target="_blank"
                  rel="noopener"
                  :data-umami-event="`outbound-${brand.name}`"
                >
                  Visit site <span aria-hidden="true">↗</span>
                  <span class="visually-hidden">(opens in a new tab)</span>
                </a>
              </div>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 54rem;
}

.thread {
  position: relative;
  display: grid;
  gap: 1.5rem;
  margin: clamp(3rem, 6vw, 5rem) 0;
  padding: 0;
  list-style: none;
}

.thread a {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 1rem;
  text-decoration: none;
}

.thread__dot {
  grid-row: span 3;
  width: 12px;
  height: 12px;
  margin-top: 0.35rem;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 6px var(--paper);
}

.thread__index {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--ink-3);
}

.thread__title {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1.1;
}

.thread__verb {
  font-size: 0.875rem;
  color: var(--ink-2);
}

.thread a:hover .thread__title {
  color: var(--clay);
}

.pillars {
  display: flex;
  flex-direction: column;
}

.pillar {
  display: grid;
  gap: 2rem;
  padding-block: clamp(2.5rem, 5vw, 4rem);
  border-top: 1px solid var(--line);
  scroll-margin-top: var(--header-h);
}

.pillar__head {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 24rem;
}

.pillar__index {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--ink-3);
}

.pillar__index::before {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
}

.brands {
  display: grid;
  gap: 1px;
  margin: 0;
  padding: 0;
  list-style: none;
  background: var(--line);
  border: 1px solid var(--line);
}

.brand {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  background: var(--paper);
  transition: background 0.35s var(--ease);
}

.brand:hover {
  background: #fbf8f3;
}

.brand--flagship {
  background: var(--paper-2);
}

.brand__kind {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.brand__name {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  font-size: clamp(1.75rem, 2.6vw, 2.25rem);
  line-height: 1.05;
}

.badge {
  padding: 0.2rem 0.55rem;
  border: 1px solid var(--accent);
  border-radius: 999px;
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}

.brand__desc {
  color: var(--ink-2);
  max-width: 34rem;
}

.brand__audience {
  font-size: 0.85rem;
  color: var(--ink-3);
}

.brand__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: auto;
  padding-top: 0.75rem;
}

.link--quiet {
  color: var(--ink-3);
  border-bottom-color: transparent;
}

@media (min-width: 720px) {
  .thread {
    grid-template-columns: repeat(3, 1fr);
  }

  .thread::before {
    content: '';
    position: absolute;
    top: calc(0.35rem + 6px);
    left: 6px;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, var(--clay), var(--ink) 50%, var(--ochre));
    opacity: 0.4;
  }

  .thread a {
    grid-template-columns: 1fr;
    row-gap: 0.4rem;
  }

  .thread__dot {
    grid-row: auto;
    margin: 0 0 0.75rem;
  }

  .brands {
    grid-template-columns: repeat(2, 1fr);
  }

  .brand--flagship {
    grid-column: 1 / -1;
  }
}

@media (min-width: 1024px) {
  .pillar {
    grid-template-columns: minmax(16rem, 0.75fr) 2fr;
    gap: 4rem;
  }

  .pillar__head {
    position: sticky;
    top: calc(var(--header-h) + 2rem);
    align-self: start;
  }

  .brand--flagship {
    grid-column: auto;
  }

  #pillar-knowledge .brands {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
