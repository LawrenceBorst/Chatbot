import { h, FunctionalComponent } from '@stencil/core';

interface LoginFormProps {
  onSubmit: (event: SubmitEvent) => Promise<void>;
}

export const LoginForm: FunctionalComponent<LoginFormProps> = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label htmlFor="username">Username</label>
    <input type="text" id="username" name="username" />
    <br />
    <label htmlFor="password">Password</label>
    <input type="password" id="password" name="password" />
    <br />
    <input type="submit" value="Submit" />
  </form>
);
