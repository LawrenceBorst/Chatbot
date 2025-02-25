import { Component, h } from '@stencil/core';
import { LogoutButton } from './logout-button';
import { logout, authState } from '../../store/auth-store';


@Component({
  tag: 'app-sidebar',
  styleUrl: 'sidebar.scss',
})
export class AppSideBar {
  render() {
    if (authState.isAuthenticated) {
      return [<app-sidebar-conversations />, <LogoutButton onClick={this.onClick} />];
    }

    return;
  }

  private onClick = async (event: MouseEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    const response: string | void = await this.makeLogoutRequest();

    if (!response) {
      return;
    }

    logout();
  };

  private async makeLogoutRequest(): Promise<string | void> {
    const url = `http://127.0.0.1:8000/auth/logout`;

    return fetch(url, {
      credentials: 'include',
      method: 'GET',
    })
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`Response not OK: returned status code ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error(error);
      });
  }
}
