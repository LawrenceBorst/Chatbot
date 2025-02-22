export type Conversation = ConversationSummary & {
  messages: Array<Message>;
};

export interface ConversationSummary {
  id: number;
  name: string;
  timestamp: Date;
}

export interface Message {
  id: number;
  message: string;
  is_user: boolean;
  timestamp: Date;
}
