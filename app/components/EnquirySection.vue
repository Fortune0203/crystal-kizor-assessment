<script setup lang="ts">
import { intents, type IntentId } from '~/data/ecosystem'

const { intent } = useEnquiry()
const { track } = useTrack()

const form = reactive({
  name: '',
  email: '',
  organisation: '',
  message: '',
  website: '', // honeypot — real visitors never see or fill this
})
const errors = reactive<Record<string, string>>({})
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const serverError = ref('')
const started = ref(false)
const formEl = ref<HTMLFormElement>()

const selected = computed(() => intents.find((i) => i.id === intent.value))

function choose(id: IntentId) {
  intent.value = id
  delete errors.intent
}

function onFirstInput() {
  if (started.value) return
  started.value = true
  track('enquiry-started', { intent: intent.value ?? 'none' })
}

function validate() {
  for (const key of Object.keys(errors)) delete errors[key]
  if (!intent.value) errors.intent = 'Choose what your enquiry is about.'
  if (form.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Please enter a valid email address.'
  if (form.message.trim().length < 10) errors.message = 'Tell us a little more (at least 10 characters).'
  return Object.keys(errors).length === 0
}

async function submit() {
  if (status.value === 'sending') return
  if (!validate()) {
    // Move focus to the first problem so keyboard and screen-reader users land on it
    nextTick(() => formEl.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
    return
  }

  status.value = 'sending'
  serverError.value = ''
  try {
    await $fetch('/api/enquiry', { method: 'POST', body: { ...form, intent: intent.value } })
    status.value = 'sent'
    track('enquiry-submitted', { intent: intent.value! })
  } catch (error: any) {
    status.value = 'error'
    serverError.value =
      error?.data?.message ?? 'Something went wrong sending your message. Please try again in a moment.'
    track('enquiry-failed', { intent: intent.value ?? 'none' })
  }
}

function reset() {
  Object.assign(form, { name: '', email: '', organisation: '', message: '', website: '' })
  status.value = 'idle'
  started.value = false
}
</script>

<template>
  <section id="enquire" class="section section--night">
    <div class="container grid">
      <header class="intro">
        <p class="eyebrow" data-reveal>Where to next</p>
        <h2 class="display h-lg" data-reveal>Let’s build <em>something together.</em></h2>
        <p class="lead" data-reveal>
          Tell us what you have in mind and it will reach the right part of Crystal’s work — whether that is a new
          building, a keynote, a partnership or a first conversation.
        </p>
        <dl class="promise" data-reveal>
          <div>
            <dt>Response time</dt>
            <dd>Within two working days</dd>
          </div>
          <div>
            <dt>Studio COKA</dt>
            <dd><a href="mailto:contact@studiocoka.com">contact@studiocoka.com</a></dd>
          </div>
        </dl>
      </header>

      <div class="panel" data-reveal>
        <div v-if="status === 'sent'" class="success" role="status" aria-live="polite">
          <BrandMark variant="monogram" class="success__mark" />
          <h3 class="display h-md">Thank you{{ form.name ? `, ${form.name.split(' ')[0]}` : '' }}.</h3>
          <p>
            Your message about <strong>{{ selected?.label.toLowerCase() }}</strong> is on its way. You will hear back
            at <strong>{{ form.email }}</strong> within two working days.
          </p>
          <button type="button" class="link" @click="reset">Send another enquiry</button>
        </div>

        <form v-else ref="formEl" novalidate @submit.prevent="submit" @input.once="onFirstInput">
          <fieldset class="topics" :aria-invalid="!!errors.intent" :aria-describedby="errors.intent ? 'err-intent' : undefined">
            <legend>What would you like to talk about?</legend>
            <div class="topics__list">
              <label v-for="item in intents" :key="item.id" class="topic" :class="{ 'is-active': intent === item.id }">
                <input
                  type="radio"
                  name="intent"
                  :value="item.id"
                  :checked="intent === item.id"
                  :aria-invalid="!!errors.intent"
                  @change="choose(item.id)"
                />
                <span class="topic__label">{{ item.label }}</span>
                <span class="topic__brand">{{ item.brand }}</span>
              </label>
            </div>
            <p v-if="errors.intent" id="err-intent" class="error">{{ errors.intent }}</p>
          </fieldset>

          <div class="row">
            <div class="field">
              <label for="f-name">Your name</label>
              <input
                id="f-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                :aria-invalid="!!errors.name"
                :aria-describedby="errors.name ? 'err-name' : undefined"
              />
              <p v-if="errors.name" id="err-name" class="error">{{ errors.name }}</p>
            </div>
            <div class="field">
              <label for="f-email">Email</label>
              <input
                id="f-email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                inputmode="email"
                :aria-invalid="!!errors.email"
                :aria-describedby="errors.email ? 'err-email' : undefined"
              />
              <p v-if="errors.email" id="err-email" class="error">{{ errors.email }}</p>
            </div>
          </div>

          <div class="field">
            <label for="f-org">Organisation <span class="optional">(optional)</span></label>
            <input id="f-org" v-model="form.organisation" type="text" autocomplete="organization" />
          </div>

          <div class="field">
            <label for="f-message">Message</label>
            <textarea
              id="f-message"
              v-model="form.message"
              rows="5"
              :placeholder="selected?.placeholder ?? 'A few lines about what you have in mind…'"
              :aria-invalid="!!errors.message"
              :aria-describedby="errors.message ? 'err-message' : undefined"
            />
            <p v-if="errors.message" id="err-message" class="error">{{ errors.message }}</p>
          </div>

          <div class="honeypot" aria-hidden="true">
            <label for="f-website">Website</label>
            <input id="f-website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
          </div>

          <p v-if="status === 'error'" class="error error--server" role="alert">{{ serverError }}</p>

          <div class="submit">
            <button type="submit" class="btn btn--light" :disabled="status === 'sending'">
              {{ status === 'sending' ? 'Sending…' : 'Send enquiry' }}
              <span v-if="status !== 'sending'" class="arrow" aria-hidden="true">→</span>
            </button>
            <p class="fineprint">Your details are only used to reply to this enquiry.</p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  gap: clamp(2.5rem, 5vw, 5rem);
}

.intro {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.promise {
  display: grid;
  gap: 1rem;
  margin: 1rem 0 0;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line-night);
}

.promise dt {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--on-night-2);
}

.promise dd {
  margin: 0.2rem 0 0;
}

.panel {
  padding: clamp(1.5rem, 4vw, 3rem);
  background: var(--night-2);
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.topics {
  margin: 0;
  padding: 0;
  border: 0;
}

.topics legend,
.field label {
  margin-bottom: 0.6rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.topics__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.topic {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem;
  border: 1px solid var(--line-night);
  cursor: pointer;
  transition:
    border-color 0.25s var(--ease),
    background 0.25s var(--ease);
}

.topic:hover {
  border-color: var(--on-night-2);
}

.topic.is-active {
  border-color: var(--caramel);
  background: rgb(196 149 116 / 0.12);
}

.topic:has(input:focus-visible) {
  outline: 2px solid var(--caramel);
  outline-offset: 2px;
}

.topic input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.topic__label {
  font-size: 0.92rem;
}

.topic__brand {
  font-size: 0.75rem;
  color: var(--on-night-2);
}

.topic.is-active .topic__brand {
  color: var(--caramel);
}

.row {
  display: grid;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
}

.optional {
  font-weight: 400;
  color: var(--on-night-2);
}

input[type='text'],
input[type='email'],
textarea {
  width: 100%;
  min-height: 48px;
  padding: 0.8rem 0;
  border: 0;
  border-bottom: 1px solid var(--line-night);
  border-radius: 0;
  background: transparent;
  color: var(--on-night);
  font-size: 1rem;
  transition: border-color 0.25s var(--ease);
}

textarea {
  resize: vertical;
  line-height: 1.5;
}

input::placeholder,
textarea::placeholder {
  color: rgb(191 174 157 / 0.6);
}

input:focus,
textarea:focus {
  outline: none;
  border-bottom-color: var(--caramel);
}

[aria-invalid='true'] {
  border-bottom-color: #e08a6d !important;
}

.error {
  margin-top: 0.45rem;
  font-size: 0.82rem;
  color: #f0a58b;
}

.error--server {
  padding: 0.85rem 1rem;
  border-left: 2px solid #f0a58b;
  background: rgb(240 165 139 / 0.08);
}

.honeypot {
  position: absolute;
  left: -9999px;
}

.submit {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
}

.btn:disabled {
  opacity: 0.7;
  cursor: progress;
}

.fineprint {
  font-size: 0.8rem;
  color: var(--on-night-2);
}

.success {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  padding-block: 2rem;
}

.success__mark {
  width: 56px;
  color: var(--caramel);
}

.success p {
  color: var(--on-night-2);
  max-width: 30rem;
}

.success strong {
  color: var(--on-night);
  font-weight: 500;
}

@media (max-width: 599px) {
  .topic {
    padding: 0.65rem 0.75rem;
  }

  .topic__label {
    font-size: 0.85rem;
    line-height: 1.3;
  }

  .topic__brand {
    display: none;
  }
}

@media (min-width: 600px) {
  .row {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: 0.8fr 1.2fr;
  }

  .intro {
    position: sticky;
    top: calc(var(--header-h) + 2rem);
    align-self: start;
  }
}
</style>
