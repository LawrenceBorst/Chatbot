import { Component, h, State } from '@stencil/core';
import { convoState } from '../../store/convo-store';

@Component({
  tag: 'app-body',
  styleUrl: 'app-body.scss',
})
export class AppBody {
  /**
   * The response passed to the bot response
   */
  @State()
  public lastResponse: {
    text: string;
    isUser: boolean;
  };

  public render() {
    return (
      <div id="dialog-container">
        <app-bot-response conversationId={convoState.activeConversation} lastResponse={this.lastResponse} />
        <app-input-field onUserResponse={this.handleUserResponse} />
      </div>
    );
  }

  private handleUserResponse = async (event: CustomEvent<string>) => {
    this.lastResponse = {
      text: event.detail,
      isUser: true,
    };

    const response: string | void = await this.makeRequestToBot(event.detail);

    if (!response) {
      return;
    }

    this.lastResponse = {
      text: response,
      isUser: false,
    };
  };

  private async makeRequestToBot(message: string): Promise<string | void> {
    const url = `http://127.0.0.1:8000/conversations/${convoState.activeConversation}?message=${message}`;

    return fetch(url, {
      credentials: 'include',
      method: 'POST',
    })
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`Response not OK: returned status code ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error(error);
      });
  }
}
