import { MessageReadStatus } from "@/constants/message";

interface MessageType {
  id: number;
  senderId: number;
  receiverId: number;
  text: string;
  readStatus: MessageReadStatus;
}

export type { MessageType };
