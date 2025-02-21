import { createStore } from '@stencil/store';

const { state } = createStore({
  isAuthenticated: false,
  user: null,
});

export function login(user: any) {
  state.isAuthenticated = true;
  state.user = user;

  localStorage.setItem('user', JSON.stringify(user));
}

export function logout() {
  state.isAuthenticated = false;
  state.user = null;

  localStorage.removeItem('user');
}

export async function checkAuthStatus(): Promise<Boolean> {
  const url = `http://127.0.0.1:8000/auth/status`;

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  if (response.ok) {
    const data = await response.json();

    state.isAuthenticated = true;
    state.user = data.user;

    return true;
  } else {
    state.isAuthenticated = false;
    state.user = null;

    return false;
  }
}

export function initializeAuth() {
  const user = localStorage.getItem('user');

  if (user) {
    state.isAuthenticated = true;
    state.user = JSON.parse(user);
  }
}

export { state as authState };
