import { Component, h, Prop, State, Watch } from '@stencil/core';
import { Conversation, Message } from '../../types/conversation';
import { getConversation } from '../../store/convo-store';

@Component({
  tag: 'app-bot-response',
  styleUrl: 'bot-response.scss',
})
export class AppBotResponse {
  @Prop()
  public conversationId: number | null;

  @State()
  private conversation: Conversation | null = null;

  @Watch('conversationId')
  async conversationIdChanged(newConversationId: number | null) {
    if (newConversationId !== null) {
      this.conversation = await getConversation(newConversationId);
    }
  }

  async componentWillLoad() {
    if (this.conversationId !== null) {
      this.conversation = await getConversation(this.conversationId);
    }
  }

  render() {
    if (!this.conversation) {
      return <div id="response-box"></div>;
    }

    return (
      <div id="response-box">
        {this.conversation.messages.map((message: Message) => (
          <p class={this.getClassName(message)}>{message.message}</p>
        ))}
      </div>
    );
  }

  private getClassName = (message: Message): string => {
    return message.is_user ? 'user' : 'bot';
  };
}
