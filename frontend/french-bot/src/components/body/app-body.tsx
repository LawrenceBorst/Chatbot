import { Component, h, State } from '@stencil/core';
import { AppInputFieldCustomEvent } from '../../components';

@Component({
  tag: 'app-body',
  styleUrl: 'app-body.scss',
})
export class AppBody {
  /**
   * The response passed to the bot response
   */
  @State()
  public response: string;

  public render() {
    return (
      <div id="dialog-container">
        <app-bot-response text={this.response}/>
        <app-input-field onResponse={this.handleResponse} />
      </div>
    );
  }

  private handleResponse = (event: AppInputFieldCustomEvent<string>) => {
    event.stopPropagation();

    this.response = event.detail;
  };
}
