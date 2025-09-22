// lib/api.ts
export interface VerifyEmailResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
  };
}

export async function verifyEmail(email: string): Promise<VerifyEmailResponse> {
  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address');
  }

  try {
    const response = await fetch("https://api.dev.mentify.kuberya.com/api/auth/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      let errorMessage = "Failed to send OTP";
      
      try {
        const errorData = await response.json();
        errorMessage = errorData?.message || errorMessage;
      } catch {
        // If response is not JSON, use status-based messages
        switch (response.status) {
          case 400:
            errorMessage = "Invalid email address format";
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

    const result = await response.json();
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
