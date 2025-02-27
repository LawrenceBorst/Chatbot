import { Component, h } from '@stencil/core';
import { convoState, setActiveConversation } from '../../store/convo-store';
import { ConversationSummary } from '../../types/conversation';

@Component({
  tag: 'app-sidebar-conversations',
  styleUrl: 'sidebar-conversations.scss',
})
export class AppSideBarConversations {
  render() {
    return <ol>{convoState.conversations.map(this.getListItem)}</ol>;
  }

  private getListItem = (convo: ConversationSummary) => {
    if (convo.id == convoState.activeConversation) {
      return <li class="active">{convo.name}</li>;
    }

    return <li onClick={this.handleClick(convo.id)}>{convo.name}</li>;
  };

  private handleClick =
    (convoId: string) =>
    (event: PointerEvent): void => {
      event.preventDefault();
      event.stopPropagation();

      setActiveConversation(convoId);
    };
}
