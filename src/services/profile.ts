import { requestFailedError } from "@/utils/error";

import { SERVER_URL } from "@/constants/server";
import { UserType } from "@/contexts/user";
import { ErrorResponse } from "@/types/response";

interface GetMyProfileResponse extends ErrorResponse {
  data: UserType;
  success: boolean;
}

class ProfileService {
  async getMyProfile(): Promise<GetMyProfileResponse> {
    const response = await fetch(`${SERVER_URL}/profile`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData: GetMyProfileResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }
}

export { ProfileService };
