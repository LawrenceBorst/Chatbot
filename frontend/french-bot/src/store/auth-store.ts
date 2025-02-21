import { createStore } from '@stencil/store';

const { state } = createStore({
  isAuthenticated: false,
  token: null,
  user: null,
});

export function login(token: string, user: any) {
  state.isAuthenticated = true;
  state.token = token;
  state.user = user;

  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export function logout() {
  state.isAuthenticated = false;
  state.token = null;
  state.user = null;

  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
}

export function initializeAuth() {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');

  if (token && user) {
    state.isAuthenticated = true;
    state.token = token;
    state.user = JSON.parse(user);
  }
}

export { state as authState };
