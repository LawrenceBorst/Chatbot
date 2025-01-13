import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-bot-response',
  styleUrl: 'bot-response.scss',
})
export class AppBotResponse {
  render() {
    return (
      <div id="response-box">
        <p>This is some text</p>
      </div>
    );
  }
}
