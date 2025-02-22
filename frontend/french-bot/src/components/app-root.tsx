import { Component, h, JSX } from '@stencil/core';
import { authState, checkAuthStatus } from '../store/auth-store';
import { getConversations } from '../store/convo-store';
import { ConversationSummary } from '../types/conversation';

const HEADER_TITLE: string = 'French Bot';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
})
export class AppRoot {
  async componentWillLoad() {
    const authStatus: Boolean = await checkAuthStatus();
    let conversations: ConversationSummary[];

    if (authStatus) {
      conversations = await getConversations();
    }
  }

  render() {
    let page: JSX.Element;

    if (authState.isAuthenticated) {
      page = <app-body />;
    } else {
      page = <login-screen />;
    }

    return [
      <app-top-bar title={HEADER_TITLE} />,
      <div id="main-container">
        <app-sidebar />
        {page}
      </div>,
    ];
  }
}
