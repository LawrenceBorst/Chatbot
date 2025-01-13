import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-body',
  styleUrl: 'app-body.scss',
})
export class AppBody {
  render() {
    return (
      <div id="dialog-container">
        <app-bot-response />
        <app-input-field />
      </div>
    );
  }
}
