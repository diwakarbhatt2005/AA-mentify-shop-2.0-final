// services/otp.ts

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    is_verified: boolean;
  };
}

export interface VerifyOtpErrorResponse {
  detail?: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
}

export async function verifyOtp(email: string, otp: string): Promise<VerifyOtpResponse> {
  // Input validation
  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address');
  }

  if (!otp || otp.trim().length === 0) {
    throw new Error('Please enter the OTP code');
  }

  try {
    const response = await fetch("https://api.dev.mentify.kuberya.com/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    // Handle different status codes
    if (!response.ok) {
      let errorMessage = "OTP verification failed";
      
      try {
        if (response.status === 422) {
          // Validation error
          const errorData: VerifyOtpErrorResponse = await response.json();
          if (errorData.detail && errorData.detail.length > 0) {
            errorMessage = errorData.detail[0].msg || "Invalid input data";
          } else {
            errorMessage = "Please check your input and try again";
          }
        } else {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorMessage;
        }
      } catch {
        // If response is not JSON, use status-based messages
        switch (response.status) {
          case 400:
            errorMessage = "Invalid request. Please check your email and OTP";
            break;
          case 422:
            errorMessage = "Please check your input and try again";
            break;
          case 429:
            errorMessage = "Too many requests. Please wait before trying again";
            break;
          case 500:
            errorMessage = "Server error. Please try again later";
            break;
          default:
            errorMessage = `Request failed with status ${response.status}`;
        }
      }
      
      throw new Error(errorMessage);
    }

    // Parse the response
    const result: VerifyOtpResponse = await response.json();
    
    // Check if the operation was successful according to the API response
    if (!result.success) {
      throw new Error(result.message || "OTP verification failed");
    }

    return result;
  } catch (error) {
    // Network errors or other fetch failures
    if (error instanceof Error) {
      throw error; // Re-throw our custom errors
    }
    
    // Handle network errors
    throw new Error("Network error. Please check your connection and try again");
  }
}
