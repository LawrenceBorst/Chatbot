import { Component, h } from '@stencil/core';

const HEADER_TITLE: string = 'French Bot';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root',
})
export class AppRoot {
  render() {
    return [<app-top-bar title={HEADER_TITLE} />, <app-body />];
  }
}
