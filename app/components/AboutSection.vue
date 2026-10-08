<script setup lang="ts">
const principles = [
  {
    title: 'Climate-responsive',
    text: 'Buildings that work with sun, shade and air — cooler, lighter on energy and built to last.',
  },
  {
    title: 'Rooted in context',
    text: 'Forms, materials and ideas drawn from African places, rather than imported from elsewhere.',
  },
  {
    title: 'Built to widen access',
    text: 'Good design, good education and good community should not be a privilege of the few.',
  },
]
</script>

<template>
  <section id="about" class="section section--sand">
    <div class="container grid">
      <figure class="media" data-reveal>
        <ResponsiveImage
          name="crystal-editorial"
          alt="Crystal Kizor seated in a timber lounge chair beside a large clay pot and books on African architecture"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
      </figure>

      <div class="copy">
        <p class="eyebrow" data-reveal>Who is Crystal Kizor</p>
        <h2 class="display h-lg" data-reveal>One practice, <em>many forms.</em></h2>

        <div class="body" data-reveal>
          <p>
            Crystal trained in architecture at the University of Nigeria, earned a Master’s in Interior Architecture at
            Coventry University, and studied sustainable real estate with the University of Cambridge.
          </p>
          <p>
            As Lead Principal of Studio COKA she designed Nigeria’s first off-grid hospital, completed in 2019 — proof
            that a building in a hot climate can cut its diesel use by 95% and still serve more patients than ever.
          </p>
          <p>
            That project shaped everything since. A studio can design great buildings, but lasting change needs
            better products, better-trained professionals and young people with the opportunity to lead. So Crystal
            builds across all of them.
          </p>
        </div>

        <ol class="principles">
          <li v-for="(item, i) in principles" :key="item.title" data-reveal :style="{ '--reveal-delay': `${i * 80}ms` }">
            <span class="num">0{{ i + 1 }}</span>
            <div>
              <h3 class="display h-sm">{{ item.title }}</h3>
              <p class="muted">{{ item.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  gap: clamp(2.5rem, 6vw, 6rem);
  align-items: start;
}

.media {
  margin: 0;
}

.media :deep(img) {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: 45% 50%;
}

.copy {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 36rem;
  color: var(--ink-2);
  font-size: 1.05rem;
}

.principles {
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--line);
}

.principles li {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1rem;
  padding-block: 1.4rem;
  border-bottom: 1px solid var(--line);
}

.principles h3 {
  margin-bottom: 0.3rem;
}

.num {
  padding-top: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--clay);
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: 0.9fr 1.1fr;
  }

  .media {
    position: sticky;
    top: calc(var(--header-h) + 2rem);
  }
}
</style>
