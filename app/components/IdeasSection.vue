<script setup lang="ts">
const { start } = useEnquiry()

const topics = [
  'Climate-responsive design',
  'African cities & urban futures',
  'Indigenous architecture & identity',
  'Design entrepreneurship',
  'Building a practice in Africa',
  'The future of the built environment',
]

const series = [
  { name: 'Building Better', text: 'How climate, cost and context shape better buildings.' },
  { name: 'In Practice', text: 'The real decisions behind running a studio.' },
  { name: 'Taking Shape', text: 'Projects followed from first sketch to finished space.' },
]
</script>

<template>
  <section id="ideas" class="section">
    <div class="container">
      <header class="intro">
        <p class="eyebrow" data-reveal>Speaking, teaching & ideas</p>
        <h2 class="display h-lg" data-reveal>Better buildings need <em>better-equipped people.</em></h2>
      </header>

      <div class="grid">
        <!-- Speaking -->
        <article class="speaking" data-reveal>
          <figure class="media">
            <ResponsiveImage
              name="crystal-podcast"
              alt="Crystal Kizor at her desk with a podcast microphone, smiling off camera"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <figcaption>Speaker · <strong>TEDxPortHarcourt 2025</strong></figcaption>
          </figure>

          <div class="speaking__copy">
            <h3 class="display h-md">Speaking</h3>
            <p class="muted">
              Keynotes, panels, lectures and workshops for conferences, universities, firms and communities —
              practical, honest and grounded in work that has been built.
            </p>
            <ul class="topics" aria-label="Speaking topics">
              <li v-for="topic in topics" :key="topic">{{ topic }}</li>
            </ul>
            <button type="button" class="btn" @click="start('speaking', 'ideas')">
              Invite Crystal to speak <span class="arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </article>

        <div class="side">
          <!-- TEA -->
          <article class="card card--tea" data-reveal>
            <p class="card__kind">Education & media platform</p>
            <h3 class="display h-md">The Effective Architect</h3>
            <p class="muted">
              Resources, lessons and conversations that help architects and built-environment professionals sharpen
              their craft, run better practices and build careers that last.
            </p>
            <button type="button" class="link" @click="start('learn', 'ideas-tea')">
              Get early access <span aria-hidden="true">→</span>
            </button>
          </article>

          <!-- Research & writing -->
          <article class="card" data-reveal style="--reveal-delay: 90ms">
            <p class="card__kind">Research, writing & film</p>
            <h3 class="display h-md">On YouTube</h3>
            <ul class="series">
              <li v-for="item in series" :key="item.name">
                <span class="series__name">{{ item.name }}</span>
                <span class="muted">{{ item.text }}</span>
              </li>
            </ul>
            <a
              href="https://www.youtube.com/@crystalkizor"
              class="link"
              target="_blank"
              rel="noopener"
              data-umami-event="outbound-youtube"
            >
              Watch “Built at 23: Nigeria’s first off-grid hospital” <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 50rem;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}

.grid {
  display: grid;
  gap: 1.5rem;
}

.speaking {
  display: grid;
  gap: 2rem;
}

.media {
  position: relative;
  margin: 0;
}

.media :deep(img) {
  width: 100%;
  aspect-ratio: 6 / 5;
  object-fit: cover;
}

.media figcaption {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  padding: 0.55rem 0.9rem;
  background: var(--paper);
  font-size: 0.8rem;
}

.speaking__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
}

.topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.topics li {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 0.82rem;
  color: var(--ink-2);
}

.side {
  display: grid;
  gap: 1.5rem;
  align-content: start;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border: 1px solid var(--line);
}

.card--tea {
  background: var(--paper-2);
  border-color: transparent;
}

.card__kind {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.series {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.series li {
  display: flex;
  flex-direction: column;
  padding-block: 0.75rem;
  border-top: 1px solid var(--line);
  font-size: 0.9rem;
}

.series__name {
  font-weight: 500;
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: 1.35fr 1fr;
    gap: 2rem;
  }
}
</style>
