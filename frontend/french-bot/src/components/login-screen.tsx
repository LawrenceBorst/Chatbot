import { Component, h } from '@stencil/core';
import { authState } from '../store/auth-store';

@Component({
  tag: 'login-screen',
  styleUrl: 'login-screen',
})
export class LoginScreen {
  render() {
    return (
      <div id="login-container">
        <h1>
          <div id="input-field">
            <form onSubmit={this.onSubmit}>
              <input type="text" id="username" name="username" />
              <br />
              <input type="text" id="password" name="password" />
              <br />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </h1>
      </div>
    );
  }

  private onSubmit = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    const targetEl: HTMLFormElement = event.target as HTMLFormElement;
    const username = this.getInputData(targetEl, '#username');
    const password = this.getInputData(targetEl, '#password');

    this.clearInputValue(targetEl, '#username');
    this.clearInputValue(targetEl, '#password');

    const response: string | void = await this.makeLoginRequest(username, password);

    if (!response) {
      return;
    }

    authState.isAuthenticated = true;
  };

  private getInputData = (form: HTMLFormElement, selector: string): string => {
    const inputEl: HTMLInputElement = form.querySelector(selector);
    return inputEl.value;
  };

  private clearInputValue = (form: HTMLFormElement, selector: string): void => {
    const inputEl: HTMLInputElement = form.querySelector(selector);
    inputEl.value = '';
  };

  private async makeLoginRequest(username: string, password: string): Promise<string | void> {
    const url = `http://127.0.0.1:8000/auth/login?username=${username}&password=${password}`;

    return fetch(url, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Credentials': 'true',
      }
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
