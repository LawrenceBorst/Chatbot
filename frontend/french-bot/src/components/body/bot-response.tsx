import { Component, h, Prop, State, Watch } from '@stencil/core';
import { ChatResponse, Conversation, Message } from '../../types/conversation';
import { getConversation } from '../../store/convo-store';

@Component({
  tag: 'app-bot-response',
  styleUrl: 'bot-response.scss',
})
export class AppBotResponse {
  /**
   * The id of the current conversation
   */
  @Prop()
  public conversationId: string | null;

  /**
   * The response passed either from the user or the bot
   */
  @Prop()
  public lastResponse: ChatResponse;

  /**
   * The conversation as saved in the DB
   */
  @State()
  private conversation: Conversation | null = null;

  /**
   * The conversation as not yet saved to the DB
   */
  @State()
  private activeConversation: Conversation | null = null;

  @Watch('conversationId')
  async conversationIdChanged(newConversationId: string | null) {
    if (newConversationId !== null) {
      this.conversation = await getConversation(newConversationId);
      this.activeConversation = null;
    }
  }

  @Watch('lastResponse')
  async userResponseChanged(newUserResponse: ChatResponse) {
    this.activeConversation = this.updateActiveConversation(newUserResponse);
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

    const activeMessages: Message[] = this.activeConversation === null ? [] : this.activeConversation.messages;

    return (
      <div id="response-box">
        {[...this.conversation.messages, ...activeMessages].map((message: Message) => (
          <p class={this.getClassName(message)}>{message.message}</p>
        ))}
      </div>
    );
  }

  private getClassName = (message: Message): string => {
    return message.isUser ? 'user' : 'bot';
  };

  private updateActiveConversation = (newResponse: ChatResponse): Conversation => {
    if (this.activeConversation === null) {
      return this.createActiveConversation(newResponse);
    }

    return {
      ...this.activeConversation,
      messages: [
        ...this.activeConversation.messages,
        {
          id: null,
          message: newResponse.text,
          isUser: newResponse.isUser,
          timestamp: new Date(),
        },
      ],
    };
  };

  private createActiveConversation = (firstResponse: ChatResponse): Conversation => {
    const firstMessage: Message = {
      id: null,
      message: firstResponse.text,
      isUser: firstResponse.isUser,
      timestamp: new Date(),
    };

    return {
      id: this.conversation === null ? null : this.conversation.id,
      name: this.conversation === null ? null : this.conversation.name,
      timestamp: new Date(),
      messages: [firstMessage],
    };
  };
}
