<script setup lang="ts">
const { start } = useEnquiry()

// Figures published by Studio COKA for the off-grid hospital (studiocoka.com)
const stats = [
  { value: '95%', label: 'less diesel used by Nigeria’s first off-grid hospital' },
  { value: '400%', label: 'increase in patient visits at the same hospital' },
  { value: 'Up to 70%', label: 'lower energy demand through climate-responsive design' },
]

const projects = [
  {
    title: 'Community Centre',
    meta: 'Civic · Concept design',
    text: 'A gathering place shaped around a great shade tree, with perforated brick walls that filter light and pull breezes through.',
    images: [
      { name: 'community-centre-exterior', alt: 'Low, earth-toned community centre with a sweeping roof and people gathered outside' },
      { name: 'community-centre-courtyard', alt: 'Circular courtyard open to the sky around a mature tree' },
      { name: 'community-centre-gallery', alt: 'Gallery corridor lit through a perforated brick screen' },
    ],
  },
  {
    title: 'Nature Home',
    meta: 'Residential · Completed',
    text: 'A family home where deep cantilevers, timber screens and an existing tree keep living spaces shaded and calm.',
    images: [
      { name: 'nature-home-front', alt: 'Front of Nature Home framed by a large tree with autumn leaves' },
      { name: 'nature-home-cantilever', alt: 'Cantilevered entrance canopy casting shade over a driveway' },
      { name: 'nature-home-dividers', alt: 'Timber slatted room divider with two armchairs' },
    ],
  },
  {
    title: 'Nature Home 2',
    meta: 'Residential · Enugu',
    text: 'Rammed-earth-toned walls, courtyards and full-height glazing that bring the garden into every room.',
    images: [
      { name: 'nature-home-ii-exterior', alt: 'Earth-toned house with a deep framed opening facing a lush garden' },
      { name: 'nature-home-ii-kitchen', alt: 'Warm timber kitchen opening onto a green garden' },
      { name: 'nature-home-ii-bedroom', alt: 'Bedroom with a glazed wall looking onto a reflecting pool' },
    ],
  },
] as const
</script>

<template>
  <section id="work" class="section section--night">
    <div class="container">
      <header class="intro">
        <div>
          <p class="eyebrow" data-reveal>Selected work · Studio COKA</p>
          <h2 class="display h-lg" data-reveal>Architecture that <em>answers to its climate.</em></h2>
        </div>
        <div class="intro__side" data-reveal>
          <p class="lead">
            Studio COKA designs and builds homes, hospitals and civic spaces that stay cool without leaning on
            machines — shaped by shade, airflow, local materials and the way people actually live.
          </p>
          <a href="https://studiocoka.com" class="link" target="_blank" rel="noopener" data-umami-event="outbound-studio-coka-work">
            See all projects on studiocoka.com <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <ul class="stats">
        <li v-for="(stat, i) in stats" :key="stat.value" data-reveal :style="{ '--reveal-delay': `${i * 80}ms` }">
          <span class="display stat__value">{{ stat.value }}</span>
          <span class="stat__label">{{ stat.label }}</span>
        </li>
      </ul>

      <div class="projects">
        <article
          v-for="(project, p) in projects"
          :key="project.title"
          class="project"
          :class="{ 'project--feature': p === 0 }"
          data-reveal
        >
          <div class="gallery" tabindex="0" :aria-label="`${project.title} images`">
            <figure v-for="(image, i) in project.images" :key="image.name" :class="`g${i}`">
              <ResponsiveImage
                :name="image.name"
                :alt="image.alt"
                :sizes="p === 0 && i === 0 ? '(min-width: 1024px) 60vw, 85vw' : '(min-width: 1024px) 30vw, 85vw'"
              />
            </figure>
          </div>
          <div class="project__copy">
            <p class="project__meta">{{ project.meta }}</p>
            <h3 class="display h-md">{{ project.title }}</h3>
            <p class="project__text">{{ project.text }}</p>
          </div>
        </article>
      </div>

      <div class="cta" data-reveal>
        <p class="display h-md">Have a site, a brief or just an idea?</p>
        <button type="button" class="btn btn--light" @click="start('project', 'work')">
          Start a project with Studio COKA <span class="arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro {
  display: grid;
  gap: 2rem;
  align-items: end;
}

.intro__side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
}

.stats {
  display: grid;
  gap: 1.5rem;
  margin: clamp(3rem, 6vw, 5rem) 0;
  padding: 2rem 0;
  list-style: none;
  border-block: 1px solid var(--line-night);
}

.stats li {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat__value {
  font-size: clamp(3rem, 6vw, 4.75rem);
  line-height: 1;
  color: var(--caramel);
}

.stat__label {
  max-width: 20rem;
  font-size: 0.9rem;
  color: var(--on-night-2);
}

.projects {
  display: grid;
  gap: clamp(3rem, 6vw, 5rem);
}

.project {
  display: grid;
  gap: 1.5rem;
}

.gallery {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 82%;
  gap: 0.75rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  margin-inline: calc(var(--gutter) * -1);
  padding-inline: var(--gutter);
}

.gallery::-webkit-scrollbar {
  display: none;
}

.gallery figure {
  margin: 0;
  scroll-snap-align: start;
  overflow: hidden;
  background: var(--night-2);
}

.gallery :deep(img) {
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  transition: transform 1.2s var(--ease);
}

.gallery figure:hover :deep(img) {
  transform: scale(1.03);
}

.project__copy {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-width: 34rem;
}

.project__meta {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--caramel);
}

.project__text {
  color: var(--on-night-2);
}

.cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: clamp(3.5rem, 7vw, 6rem);
  padding-top: 2.5rem;
  border-top: 1px solid var(--line-night);
}

@media (min-width: 720px) {
  .stats {
    grid-template-columns: repeat(3, 1fr);
  }

  .gallery {
    grid-auto-flow: row;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    aspect-ratio: 16 / 10;
    overflow: visible;
    margin-inline: 0;
    padding-inline: 0;
  }

  .gallery figure {
    position: relative;
  }

  .gallery :deep(img) {
    position: absolute;
    inset: 0;
    aspect-ratio: auto;
  }

  .gallery .g0 {
    grid-row: span 2;
  }
}

@media (min-width: 1024px) {
  .intro {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 4rem;
  }

  .projects {
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }

  .project--feature {
    grid-column: 1 / -1;
    grid-template-columns: 2.2fr 1fr;
    align-items: end;
    gap: 2.5rem;
  }

  .project--feature .gallery {
    aspect-ratio: 16 / 9;
  }

  .project:not(.project--feature) .gallery {
    grid-template-columns: 1.6fr 1fr;
    aspect-ratio: 5 / 4;
  }
}
</style>
