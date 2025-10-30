// composables/useAuth.ts
import { useCookie, useState, navigateTo, createError } from '#imports'; // Import createError for consistent error handling
import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  userId?: number;
  email?: string;
  role?: string;
}

export function useAuth() {
  const user = useState<CustomJwtPayload | null>('auth_user', () => null);
  const loggedIn = useState<boolean>('auth_logged_in', () => false);
  const authToken = useCookie<string | null>('auth_token', { path: '/' });

  function syncCookieWithState() {
    const token = authToken.value;
    if (!token) {
      user.value = null;
      loggedIn.value = false;
      return;
    }
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        // Token is expired
        user.value = null;
        loggedIn.value = false;
        authToken.value = null; // Clear the expired cookie
      } else {
        user.value = decoded;
        loggedIn.value = true;
      }
    } catch (e) {
      // Token is invalid
      user.value = null;
      loggedIn.value = false;
      authToken.value = null; // Clear the invalid cookie
    }
  }

  async function login(email: string, password: string) {
    try {
      // Now expect the server to return the token in the body
      const response = await $fetch<{ token: string; user: { email: string; role: string } }>('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });

      const token = response.token;
      if (!token) throw new Error('Login response did not include a token.');
      
      // CRITICAL FIX: Manually set authToken.value with the token from the response body.
      // This ensures useCookie's internal state is updated synchronously.
      authToken.value = token;
      
      // Now call syncCookieWithState, which will correctly read the updated authToken.value
      syncCookieWithState();

      if (loggedIn.value) {
        await navigateTo('/admin/dashboard');
      } else {
        // This error path should ideally not be hit with the fix above.
        throw new Error('Login succeeded but client-side state could not be synced correctly.');
      }

    } catch (err: any) {
      console.error("Login error:", err);
      loggedIn.value = false;
      user.value = null;
      // Better error message for the frontend
      const errorMessage = err.data?.message || err.message || 'An unexpected error occurred during login.';
      throw createError({ statusCode: err.statusCode || 500, message: errorMessage });
    }
  }

  function logout() {
    authToken.value = null;
    user.value = null;
    loggedIn.value = false;
    navigateTo('/admin/login', { replace: true });
  }

  return { user, loggedIn, login, logout, syncCookieWithState };
}