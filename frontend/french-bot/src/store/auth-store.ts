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
  let response: Response;

  try {
    response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });
  } catch (error) {}

  const data: {
    id: null | number;
    name: null | string;
  } = await response.json();

  if (data.id !== null && data.name !== null) {
    state.isAuthenticated = true;
    state.user = data.id;

    return true;
  } else {
    state.isAuthenticated = false;
    state.user = null;

    return false;
  }
}

export { state as authState };
