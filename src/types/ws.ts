interface WSEnvelope<T, P = any> {
  type: T;
  payload: P;
}

interface WSMessagePayload {
  from: number;
  to: number;
  text: string;
}

interface WSTypingPayload {
  from: number;
  to: number;
  isTyping: boolean;
}

export type { WSEnvelope, WSMessagePayload, WSTypingPayload };
