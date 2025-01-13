import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-bot-response',
  styleUrl: 'bot-response.scss',
})
export class AppBotResponse {
  /**
   * Text to add to the dialog
   */
  @Prop()
  public text: string;

  render() {
    return (
      <div id="response-box">
        <p>{this.text}</p>
      </div>
    );
  }
}
