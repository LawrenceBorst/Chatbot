import { h, FunctionalComponent } from '@stencil/core';
import { FormState } from './types';

interface LoginButtonsProps {
  onClick: (formState: FormState) => (event: MouseEvent) => void;
}

export const LoginButtons: FunctionalComponent<LoginButtonsProps> = ({ onClick }) => (
  <div>
    <button type="button" onClick={onClick('login' as any)}>
      Login
    </button>
    <button type="button" onClick={onClick('sign up' as any)}>
      Register
    </button>
  </div>
);
