import { h, FunctionalComponent } from '@stencil/core';

interface RegisterFormProps {
  onSubmit: (event: SubmitEvent) => Promise<void>;
}

export const RegisterForm: FunctionalComponent<RegisterFormProps> = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label htmlFor="username">Username</label>
    <input type="text" id="username" name="username" />
    <br />
    <label htmlFor="password">Password</label>
    <input type="password" id="password" name="password" />
    <br />
    <label htmlFor="email">Email</label>
    <input type="email" id="email" name="email" />
    <br />
    <input type="submit" value="Submit" />
  </form>
);
