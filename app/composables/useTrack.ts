declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string | number>) => void }
  }
}

/**
 * Thin wrapper over Umami custom events. A no-op when analytics is not configured,
 * so components never need to care whether tracking is on.
 * Simple clicks use `data-umami-event` attributes instead (handled by Umami itself).
 */
export function useTrack() {
  function track(event: string, data?: Record<string, string | number>) {
    if (import.meta.client) window.umami?.track(event, data)
  }
  return { track }
}
