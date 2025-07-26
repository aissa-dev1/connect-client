import { requestFailedError } from "@/utils/error";

import { SERVER_URL } from "@/constants/server";
import { MessageResponse } from "../types/response";

interface SignUpData {
  email: string;
  username: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface SignUpResponse extends MessageResponse {}

interface SignInResponse extends MessageResponse {}

interface SignOutResponse extends MessageResponse {}

class AuthService {
  async signUp(data: SignUpData): Promise<SignUpResponse> {
    const response = await fetch(`${SERVER_URL}/auth/sign-up`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData: SignUpResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }

  async signIn(data: SignInData): Promise<SignInResponse> {
    const response = await fetch(`${SERVER_URL}/auth/sign-in`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData: SignInResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }

  async signOut(): Promise<SignOutResponse> {
    const response = await fetch(`${SERVER_URL}/auth/sign-out`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData: SignOutResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }
}

export { AuthService, type SignUpData, type SignInData };
