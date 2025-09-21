export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
}

export interface VerifyEmailData {
  email: string
}

export interface ValidationErrorItem {
  loc: Array<string | number>
  msg: string
  type: string
}

export interface ValidationError {
  detail: ValidationErrorItem[]
}

import { API_BASE } from '../../services/config'

async function postJson<T = any>(path: string, body: unknown) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  const text = await res.text()
  try {
    return { status: res.status, body: JSON.parse(text) as T }
  } catch (e) {
    return { status: res.status, body: text as unknown as T }
  }
}

export async function verifyEmail(payload: VerifyEmailData) {
  const { status, body } = await postJson<ApiResponse<VerifyEmailData> | ValidationError>(
    '/api/auth/verify-email',
    payload
  )

  if (status === 200) return { ok: true, data: body as ApiResponse<VerifyEmailData> }
  if (status === 422) return { ok: false, validation: body as ValidationError }
  return { ok: false, error: body }
}

export default verifyEmail
