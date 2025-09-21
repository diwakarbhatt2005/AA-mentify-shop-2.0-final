Auth service helpers

Usage:

Import and call the `verifyEmail` helper from your client code. It will POST to `/api/auth/verify-email` using `NEXT_PUBLIC_API_BASE` if set, otherwise the dev URL.

Example:


import verifyEmail from 'services/auth/verifyEmail'
import verifyOtp from 'services/auth/verifyOtp'

const resp = await verifyEmail({ email: 'user@example.com' })

if (resp.ok) {
  // success: resp.data contains the API response
} else if (resp.validation) {
  // validation errors
} else {
  // other error
}

// Verify OTP example
const otpResp = await verifyOtp({ email: 'user@example.com', otp: '123456' })
if (otpResp.ok) {
  // success: otpResp.data contains the API response with is_verified flag
}

// Set password example
import setPassword from 'services/auth/setPassword'

const setResp = await setPassword({ email: 'user@example.com', password: 'stringst' })
if (setResp.ok) {
  // success
}

// Update user details example
import updateUserDetails from 'services/auth/userDetails'

const userResp = await updateUserDetails({
  email: 'user@example.com',
  username: 'string',
  first_name: 'string',
  last_name: 'string',
  date_of_birth: '2025-09-21',
  place_of_birth: 'string',
  time_of_birth: '15:53:34.083Z',
})
if (userResp.ok) {
  // success
}
