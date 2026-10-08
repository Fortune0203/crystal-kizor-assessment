<script setup lang="ts">
import { pillars, socials } from '~/data/ecosystem'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="top">
        <a href="#top" class="wordmark" aria-label="Crystal Kizor — back to top">
          <BrandMark variant="wordmark" />
        </a>
        <p class="tagline display">Rooted in place. <em>Designed for people.</em></p>
      </div>

      <div class="cols">
        <nav v-for="pillar in pillars" :key="pillar.id" :aria-label="pillar.title">
          <p class="col__title">{{ pillar.title }}</p>
          <ul>
            <li v-for="brand in pillar.brands" :key="brand.name">
              <a
                v-if="brand.href"
                :href="brand.href"
                target="_blank"
                rel="noopener"
                :data-umami-event="`footer-${brand.name}`"
              >{{ brand.name }} <span aria-hidden="true">↗</span></a>
              <a v-else :href="`#pillar-${pillar.id}`">{{ brand.name }}</a>
            </li>
          </ul>
        </nav>
        <nav aria-label="Social">
          <p class="col__title">Follow Crystal</p>
          <ul>
            <li v-for="social in socials" :key="social.name">
              <a :href="social.href" target="_blank" rel="noopener" :data-umami-event="`social-${social.name}`">
                {{ social.name }} <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="bottom">
        <p>© {{ year }} Crystal Kizor. Enugu, Nigeria.</p>
        <a href="#enquire">Get in touch</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: clamp(4rem, 8vw, 6rem) 2rem;
  background: var(--paper);
  border-top: 1px solid var(--line);
}

.top {
  display: grid;
  gap: 2rem;
  align-items: end;
  padding-bottom: clamp(3rem, 6vw, 4.5rem);
}

.wordmark {
  display: block;
  width: min(100%, 420px);
  color: var(--ink);
}

.tagline {
  font-size: clamp(1.5rem, 2.6vw, 2.25rem);
  line-height: 1.15;
}

.cols {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem 1.5rem;
  padding-block: 2.5rem;
  border-top: 1px solid var(--line);
}

.col__title {
  margin-bottom: 1rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.cols ul {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.cols a,
.bottom a {
  font-size: 0.92rem;
  text-decoration: none;
  color: var(--ink-2);
  transition: color 0.25s var(--ease);
}

.cols a:hover,
.bottom a:hover {
  color: var(--clay);
}

.bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  font-size: 0.82rem;
  color: var(--ink-3);
}

@media (min-width: 900px) {
  .top {
    grid-template-columns: 1fr 1fr;
  }

  .tagline {
    justify-self: end;
    text-align: right;
  }

  .cols {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
