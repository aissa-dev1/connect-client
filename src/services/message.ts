import { SERVER_URL } from "@/constants/server";
import { MessageType } from "@/types/message";
import { ErrorResponse } from "@/types/response";
import { requestFailedError } from "@/utils/error";

interface GetMessagesBetweenUsersResponse extends ErrorResponse {
  data: MessageType[];
  success: boolean;
}

class MessageService {
  async getMessagesBetweenUsers(
    senderId: number,
    receiverId: number
  ): Promise<GetMessagesBetweenUsersResponse> {
    const response = await fetch(
      `${SERVER_URL}/messages/between/${senderId}/${receiverId}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData: GetMessagesBetweenUsersResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }
}

export { MessageService };
