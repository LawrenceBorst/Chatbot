import { Component, FunctionalComponent, h, State } from '@stencil/core';
import { authState } from '../../store/auth-store';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import { LoginButtons } from './login-buttons';
import { FormState } from './types';
import { getConversations } from '../../store/convo-store';

@Component({
  tag: 'login-screen',
  styleUrl: 'login-screen.scss',
})
export class LoginScreen {
  @State()
  private form: FormState = 'login';

  render() {
    let form: FunctionalComponent;

    if (this.form === 'login') {
      form = <LoginForm onSubmit={this.onSubmitLogin} />;
    } else if (this.form === 'sign up') {
      form = <RegisterForm onSubmit={this.onSubmitSignUp} />;
    }

    return (
      <div id="login-container">
        <div id="input-field">{form}</div>
        <LoginButtons onClick={this.onClick} />
      </div>
    );
  }

  private onSubmitLogin = async (event: SubmitEvent): Promise<void> => {
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
    getConversations();
  };

  private onSubmitSignUp = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    const targetEl: HTMLFormElement = event.target as HTMLFormElement;
    const username = this.getInputData(targetEl, '#username');
    const password = this.getInputData(targetEl, '#password');
    const email = this.getInputData(targetEl, '#email');

    this.clearInputValue(targetEl, '#username');
    this.clearInputValue(targetEl, '#password');
    this.clearInputValue(targetEl, '#email');

    const response: string | void = await this.makeSignUpRequest(username, password, email);

    if (!response) {
      return;
    }

    authState.isAuthenticated = true;
  };

  private onClick =
    (formState: FormState) =>
    (event: MouseEvent): void => {
      event.preventDefault();
      event.stopPropagation();

      if (formState === 'login') {
        this.form = 'login';
      } else if (formState === 'sign up') {
        this.form = 'sign up';
      }
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

  private async makeSignUpRequest(username: string, password: string, email: string): Promise<string | void> {
    const url = `http://127.0.0.1:8000/auth/register?username=${username}&password=${password}&email=${email}`;

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
