export type Conversation = ConversationSummary & {
  messages: Array<Message>;
};

export interface ConversationSummary {
  id: number | null;
  name: string | null;
  timestamp: Date;
}

export interface Message {
  id: number;
  message: string | null;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  text: string;
  isUser: boolean;
}
