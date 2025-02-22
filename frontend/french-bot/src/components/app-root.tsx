import { Component, h } from '@stencil/core';
import { authState, checkAuthStatus, initializeAuth } from '../store/auth-store';

const HEADER_TITLE: string = 'French Bot';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root',
})
export class AppRoot {
  async componentWillLoad() {
    const authStatus: Boolean = await checkAuthStatus();

    if (!authStatus) {
      initializeAuth();
    }
  }

  render() {
    if (authState.isAuthenticated) {
      return [<app-top-bar title={HEADER_TITLE} />, <app-body />];
    } else {
      return [<app-top-bar title={HEADER_TITLE} />, <login-screen />];
    }
  }
}
