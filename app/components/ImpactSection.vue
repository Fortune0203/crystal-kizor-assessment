<script setup lang="ts">
const { start } = useEnquiry()
</script>

<template>
  <section id="impact" class="section section--sand">
    <div class="container">
      <header class="intro">
        <p class="eyebrow" data-reveal>Purpose & community</p>
        <h2 class="display h-lg" data-reveal>The future is built by <em>the young people we invest in.</em></h2>
        <p class="lead" data-reveal>
          Buildings last for generations, so who gets to learn, lead and belong matters just as much as what gets
          built. These two initiatives are where that conviction becomes action.
        </p>
      </header>

      <div class="grid">
        <article class="card card--ako" data-reveal>
          <p class="card__kind">Education access</p>
          <h3 class="display h-md">AKO Alliance</h3>
          <p class="quote display">“A world where every child is returned to school.”</p>
          <p class="muted">
            AKO Alliance sponsors tuition, books and uniforms for out-of-school children, giving each one a private
            ID so every sponsorship can be tracked and audited.
          </p>
          <p class="figure">
            <span class="display">120+</span>
            <span>children sponsored back to school in the first month</span>
          </p>
          <div class="actions">
            <a
              href="https://akoalliance.com"
              class="btn"
              target="_blank"
              rel="noopener"
              data-umami-event="outbound-ako-alliance"
            >
              Sponsor a child <span aria-hidden="true">↗</span>
            </a>
            <button type="button" class="link" @click="start('education', 'impact-ako')">Partner with AKO</button>
          </div>
        </article>

        <article class="card card--aaf" data-reveal style="--reveal-delay: 90ms">
          <p class="card__kind">Christian youth movement</p>
          <h3 class="display h-md">Alive and Free</h3>
          <p class="quote display">Truth, healing, freedom, identity and purpose — life in Christ.</p>
          <p class="muted">
            A movement for young people who want to know who they are and why they are here, with a community that
            walks the journey alongside them.
          </p>
          <div class="actions">
            <button type="button" class="btn btn--ghost" @click="start('youth', 'impact-aaf')">
              Get involved <span class="arrow" aria-hidden="true">→</span>
            </button>
          </div>
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
  max-width: 52rem;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}

.grid {
  display: grid;
  gap: 1.5rem;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.1rem;
  padding: clamp(1.75rem, 4vw, 3rem);
  background: var(--paper);
  border-top: 3px solid var(--accent);
}

.card--ako {
  --accent: var(--ochre);
}

.card--aaf {
  --accent: var(--clay);
}

.card__kind {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.quote {
  font-size: clamp(1.35rem, 2.2vw, 1.75rem);
  font-style: italic;
  font-weight: 400;
  line-height: 1.25;
  color: var(--ink);
}

.card--ako .quote {
  color: var(--ochre-ink);
}

.figure {
  display: flex;
  align-items: baseline;
  gap: 0.9rem;
  padding-block: 1rem;
  border-block: 1px solid var(--line);
  width: 100%;
  font-size: 0.9rem;
  color: var(--ink-2);
}

.figure .display {
  font-size: 2.75rem;
  line-height: 1;
  color: var(--ochre-ink);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  margin-top: auto;
  padding-top: 0.5rem;
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
