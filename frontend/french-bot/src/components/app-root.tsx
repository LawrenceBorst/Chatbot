import { Component, h } from '@stencil/core';
import { authState, initializeAuth } from '../store/auth-store';

const HEADER_TITLE: string = 'French Bot';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root',
})
export class AppRoot {
  componentWillLoad() {
    initializeAuth();
  }

  render() {
    if (authState.isAuthenticated) {
      return [<app-top-bar title={HEADER_TITLE} />, <app-body />];
    } else {
      return [<app-top-bar title={HEADER_TITLE} />, <login-screen />];
    }
  }
}
