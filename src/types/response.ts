interface MessageResponse {
  message: string;
  success: boolean;
}

type ErrorResponse = Partial<MessageResponse>;

export type { MessageResponse, ErrorResponse };
