import { SERVER_URL } from "@/constants/server";
import { MinimalUserType } from "@/contexts/user";
import { ErrorResponse } from "@/types/response";
import { requestFailedError } from "@/utils/error";

interface GetBlocksBetweenUsersResponse extends ErrorResponse {
  data: {
    id: number;
    blockerId: number;
    blockedId: number;
  }[];
  success: boolean;
}

interface GetBlockerBlocksResponse extends ErrorResponse {
  data: MinimalUserType[];
  success: boolean;
}

interface BlockResponse extends ErrorResponse {}

interface UnblockResponse extends ErrorResponse {}

class BlockService {
  async getBlocksBetweenUsers(
    blockerId: number,
    blockedId: number
  ): Promise<GetBlocksBetweenUsersResponse> {
    const response = await fetch(
      `${SERVER_URL}/blocks/between/${blockerId}/${blockedId}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData: GetBlocksBetweenUsersResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }

  async getBlockerBlocks(): Promise<GetBlockerBlocksResponse> {
    const response = await fetch(`${SERVER_URL}/blocks/all`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData: GetBlockerBlocksResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }

  async block(blockedId: number): Promise<BlockResponse> {
    const response = await fetch(`${SERVER_URL}/blocks/${blockedId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData: BlockResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }

  async unblock(blockedId: number): Promise<UnblockResponse> {
    const response = await fetch(`${SERVER_URL}/blocks/${blockedId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData: UnblockResponse = await response.json();

    if (!response.ok || !responseData.success) {
      throw new Error(
        responseData.message || requestFailedError(response.status)
      );
    }

    return responseData;
  }
}

export { BlockService };
