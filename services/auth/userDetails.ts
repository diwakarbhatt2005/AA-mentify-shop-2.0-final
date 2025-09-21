export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
}

export interface UserDetailsData {
  email: string
  username: string
  first_name: string
  last_name: string
  date_of_birth: string // ISO date (YYYY-MM-DD)
  place_of_birth: string
  time_of_birth: string // ISO time
}

export interface UserDetailsResult {
  email: string
  is_converted: boolean
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

export async function updateUserDetails(payload: UserDetailsData) {
  const { status, body } = await postJson<ApiResponse<UserDetailsResult> | ValidationError>(
    '/api/auth/user-details',
    payload
  )

  if (status === 200) return { ok: true, data: body as ApiResponse<UserDetailsResult> }
  if (status === 422) return { ok: false, validation: body as ValidationError }
  return { ok: false, error: body }
}

export default updateUserDetails
