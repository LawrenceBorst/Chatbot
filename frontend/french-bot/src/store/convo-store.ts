import { createStore } from '@stencil/store';
import { ConversationSummary } from '../types/conversation';

const { state } = createStore({
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

export async function setActiveConversation(convoId: number) {
  state.activeConversation = state.conversations.find(convo => convo.id === convoId);
}

export { state as convoState };
