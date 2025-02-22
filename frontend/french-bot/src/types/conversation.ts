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
  text: string;
  timestamp: Date;
  sender: string;
}
