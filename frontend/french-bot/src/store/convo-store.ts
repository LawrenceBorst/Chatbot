import { createStore } from '@stencil/store';
import { ConversationSummary, Conversation, Message } from '../types/conversation';

const { state } = createStore<{ conversations: ConversationSummary[]; activeConversation: number | null }>({
  conversations: [],
  activeConversation: null,
});

export async function getConversations(): Promise<ConversationSummary[]> {
  const url = `http://127.0.0.1:8000/conversations`;

  const res = await fetch(url, { method: 'GET', credentials: 'include' });
  if (!res.ok) {
    return;
  }

  state.conversations = (await res.json()).map((convo: { id: number; name: string; timestamp: string }) => ({
    ...convo,
    timestamp: new Date(convo.timestamp),
  }));

  return state.conversations;
}

export async function getConversation(conservationId: number): Promise<Conversation> {
  const url = `http://127.0.0.1:8000/conversation?id=${conservationId}`;

  const res = await fetch(url, { method: 'GET', credentials: 'include' });
  if (!res.ok) {
    return;
  }

  const conversation: Message[] = (await res.json()).map((message: { id: number; message: string; is_user: boolean; timestamp: Date }) => {
    return { ...message, timestamp: new Date(message.timestamp) };
  });

  return { ...state.conversations[state.activeConversation], messages: conversation };
}

export async function setActiveConversation(convoId: number) {
  state.activeConversation = convoId;
}

export { state as convoState };
