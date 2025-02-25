import { h, FunctionalComponent } from '@stencil/core';

interface LogoutButtonProps {
  onClick: (event: MouseEvent) => Promise<void>;
}

export const LogoutButton: FunctionalComponent<LogoutButtonProps> = ({ onClick }) => (
  <button type="button" onClick={onClick}>
    Logout
  </button>
);
