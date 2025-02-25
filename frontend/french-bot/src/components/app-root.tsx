import { Component, h } from '@stencil/core';
import { authState, checkAuthStatus } from '../store/auth-store';

const HEADER_TITLE: string = 'French Bot';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
})
export class AppRoot {
  componentWillLoad() {
    checkAuthStatus();
  }

  render() {
    if (authState.isAuthenticated) {
      return [
        <app-top-bar title={HEADER_TITLE} />,
        <div id="main-container">
          <app-sidebar />
          <app-body />
        </div>,
      ];
    } else {
      return [
        <app-top-bar title={HEADER_TITLE} />,
        <div id="main-container">
          <app-sidebar />
          <login-screen />
        </div>,
      ];
    }
  }
}
