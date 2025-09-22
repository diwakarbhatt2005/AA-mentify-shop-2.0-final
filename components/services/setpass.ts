// services/setpass.ts

export interface SetPasswordResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
  };
}

export async function setPassword(email: string, password: string): Promise<SetPasswordResponse> {
  try {
    const response = await fetch("https://api.dev.mentify.kuberya.com/api/auth/create-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // Check if the response indicates success
    if (data.success === false) {
      throw new Error(data.message || "Password creation failed");
    }

    if (!response.ok) {
      throw new Error(data?.message || "Password creation failed");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error occurred while setting password");
  }
}
