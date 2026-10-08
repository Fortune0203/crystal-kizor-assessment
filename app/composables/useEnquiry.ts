import type { IntentId } from '~/data/ecosystem'

/** Shared enquiry intent, so any CTA on the page can pre-select the form's topic. */
export function useEnquiry() {
  const intent = useState<IntentId | null>('enquiry-intent', () => null)
  const { track } = useTrack()

  function start(id: IntentId, source: string) {
    intent.value = id
    track('enquiry-intent', { intent: id, source })
    document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth' })
  }

  return { intent, start }
}
