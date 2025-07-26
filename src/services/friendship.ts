import { requestFailedError } from "@/utils/error";

import { SERVER_URL } from "@/constants/server";
import { FriendshipStatus } from "@/constants/friendship";
import { ErrorResponse } from "@/types/response";
import { MinimalUserType } from "@/contexts/user";

interface GetFriendshipResponse extends ErrorResponse {
  // TODO: Replace this with Friendship interface
  data: {
    id: number;
    requesterId: number;
    receiverId: number;
    status: FriendshipStatus;
  };
  success: boolean;
}

interface GetRequestsResponse extends ErrorResponse {
  data: MinimalUserType[];
  success: boolean;
}

interface GetFriendsResponse extends ErrorResponse {
  data: MinimalUserType[];
  success: boolean;
}

interface SendFriendRequestResponse extends ErrorResponse {}

interface AcceptFriendRequestResponse extends ErrorResponse {}

interface DeleteFriendRequestResponse extends ErrorResponse {}

class FriendshipService {
  async getFriendRequest(receiverId: number): Promise<GetFriendshipResponse> {
    const response = await fetch(
      `${SERVER_URL}/friendships/receiver/${receiverId}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData: GetFriendshipResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }

  async getFriendRequests(): Promise<GetRequestsResponse> {
    const response = await fetch(`${SERVER_URL}/friendships/requests`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData: GetRequestsResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }

  async getFriends(): Promise<GetFriendsResponse> {
    const response = await fetch(`${SERVER_URL}/friendships/friends`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData: GetFriendsResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }

  async sendFriendRequest(
    receiverId: number
  ): Promise<SendFriendRequestResponse> {
    const response = await fetch(`${SERVER_URL}/friendships/${receiverId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData: SendFriendRequestResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }

  async acceptFriendRequest(
    receiverId: number
  ): Promise<AcceptFriendRequestResponse> {
    const response = await fetch(
      `${SERVER_URL}/friendships/accept/${receiverId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData: AcceptFriendRequestResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }

  async deleteFriendRequest(
    receiverId: number
  ): Promise<DeleteFriendRequestResponse> {
    const response = await fetch(`${SERVER_URL}/friendships/${receiverId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData: DeleteFriendRequestResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }
}

export { FriendshipService };
