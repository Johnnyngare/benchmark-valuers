// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo } from '#imports';
import { useAuth } from '~/composables/useAuth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn, syncCookieWithState } = useAuth();
  
  if (!loggedIn.value) {
    syncCookieWithState();
  }

  const requiresAuth = to.path.startsWith('/admin') && to.path !== '/admin/login';
  const isGuestPage = to.path === '/admin/login';

  if (requiresAuth && !loggedIn.value) {
    console.warn(`MIDDLEWARE: Access DENIED to '${to.path}'. Redirecting to /admin/login.`);
    return navigateTo('/admin/login', { replace: true });
  }

  if (isGuestPage && loggedIn.value) {
    console.log(`MIDDLEWARE: User already logged in. Redirecting to /admin/dashboard.`);
    return navigateTo('/admin/dashboard', { replace: true });
  }

  console.log(`MIDDLEWARE: Access GRANTED to '${to.path}'.`);
});