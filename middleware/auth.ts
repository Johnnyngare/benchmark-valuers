// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo } from '#imports';
import { useAuth } from '~/composables/useAuth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn, syncCookieWithState } = useAuth();
  
  // Important: This middleware's core logic should primarily prevent unauthorized access.
  // The 'loggedIn' state should be the source of truth, updated from the cookie only when necessary.

  // --- CRITICAL FIX ---
  // Only attempt to sync state from the cookie if our 'loggedIn' reactive state is currently false.
  // This prevents overriding a 'true' state during a fast client-side navigation,
  // where the cookie might not yet be readable by useCookie() in the same tick.
  if (!loggedIn.value) {
    syncCookieWithState();
  }
  // --- END CRITICAL FIX ---

  const requiresAuth = to.path.startsWith('/admin') && to.path !== '/admin/login';
  const isGuestPage = to.path === '/admin/login';

  // --- Main Protection Logic ---

  // 1. If a route requires authentication and the user is NOT logged in,
  //    redirect them to the login page.
  if (requiresAuth && !loggedIn.value) {
    // If running on server, simply navigate. Client-side, replace history.
    console.warn(`MIDDLEWARE: Access DENIED to '${to.path}'. Redirecting to /admin/login.`);
    return navigateTo('/admin/login', { replace: true });
  }

  // 2. If the user is ALREADY logged in and tries to visit the login page,
  //    redirect them to the dashboard.
  if (isGuestPage && loggedIn.value) {
    console.log(`MIDDLEWARE: User already logged in. Redirecting to /admin/dashboard.`);
    return navigateTo('/admin/dashboard', { replace: true });
  }

  // If none of the above conditions met, access is granted.
  console.log(`MIDDLEWARE: Access GRANTED to '${to.path}'.`);
});