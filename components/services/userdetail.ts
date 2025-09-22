// services/userdetail.ts

export interface UserDetailsRequest {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string; // Format: YYYY-MM-DD, optional
  place_of_birth?: string;
  time_of_birth?: string; // Format: HH:MM:SS, optional
}

export interface UserDetailsResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    is_converted?: boolean;
  };
}

export async function updateUserDetails(payload: UserDetailsRequest): Promise<UserDetailsResponse> {
  try {
    // Clean up the payload - remove empty strings and send null/undefined for optional fields
    const cleanedPayload = {
      email: payload.email,
      username: payload.username,
      first_name: payload.first_name,
      last_name: payload.last_name,
      ...(payload.date_of_birth && { date_of_birth: payload.date_of_birth }),
      ...(payload.place_of_birth && { place_of_birth: payload.place_of_birth }),
      ...(payload.time_of_birth && { time_of_birth: payload.time_of_birth })
    };

    console.log('Sending payload to API:', cleanedPayload);

    const response = await fetch("https://api.dev.mentify.kuberya.com/api/auth/user-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(cleanedPayload),
    });

    const data = await response.json();
    
    console.log('API Response:', { status: response.status, data });

    // Handle 422 errors specifically with detailed error messages
    if (response.status === 422) {
      const errorMessage = data?.message || 
                          (data?.errors ? Object.values(data.errors).flat().join(', ') : '') ||
                          'Validation error - please check your input fields';
      throw new Error(errorMessage);
    }

    // Check if the response indicates success
    if (data.success === false) {
      throw new Error(data.message || "Failed to update user details");
    }

    if (!response.ok) {
      throw new Error(data?.message || `API Error: ${response.status} - ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('User details update error details:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error occurred while updating user details");
  }
}
