// Centralised configuration for services
// Set NEXT_PUBLIC_API_BASE in your .env.local (example provided at project root)
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.dev.mentify.kuberya.com'

// If you want a runtime warning when the env isn't set, uncomment below:
// if (!process.env.NEXT_PUBLIC_API_BASE) {
//   console.warn('NEXT_PUBLIC_API_BASE is not set — falling back to default API base')
// }

export default {
  API_BASE,
}
