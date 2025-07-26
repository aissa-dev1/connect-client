import { requestFailedError } from "@/utils/error";

import { SERVER_URL } from "@/constants/server";
import { ErrorResponse } from "@/types/response";
import { SearchUserType, UserType } from "@/contexts/user";

interface SeachUserResponse extends ErrorResponse {
  data: SearchUserType[];
  success: boolean;
}

interface GetUserByUserNameResponse extends ErrorResponse {
  data: UserType;
  success: boolean;
}

class UserService {
  async searchUsers(query: string): Promise<SeachUserResponse> {
    const response = await fetch(`${SERVER_URL}/users/search?q=${query}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData: SeachUserResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }

  async getUserByUserName(
    username: string
  ): Promise<GetUserByUserNameResponse> {
    const response = await fetch(`${SERVER_URL}/users/u/${username}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData: GetUserByUserNameResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }
}

export { UserService };
