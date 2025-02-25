import { createStore } from '@stencil/store';
import { getConversations, resetStore } from './convo-store';
import { LoginResponse } from '../components/login/types';

const { state } = createStore({
  isAuthenticated: false,
  user: null,
});

export function login(user: number) {
  state.isAuthenticated = true;
  state.user = user;

  getConversations();
}

export function logout() {
  state.isAuthenticated = false;
  state.user = null;

  resetStore();
}

export async function checkAuthStatus(): Promise<Boolean> {
  const url = `http://127.0.0.1:8000/auth/status`;
  let response: Response;

  try {
    response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });
  } catch (error) {}

  const data: LoginResponse = await response.json();

  if (data.id !== null && data.name !== null) {
    login(data.id);

    return true;
  } else {
    logout();

    return false;
  }
}

export { state as authState };
