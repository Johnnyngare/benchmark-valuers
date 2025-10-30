// plugins/auth-state.ts
import { defineNuxtPlugin, useState } from '#imports';
import type { JwtPayload } from 'jwt-decode';

// --- CHANGED: Updated interface to match the new JWT payload ---
interface CustomJwtPayload extends JwtPayload {
  userId?: number;
  email?: string;
  role?: string;
}

export default defineNuxtPlugin(() => {
  // This plugin correctly initializes the global state variables.
  useState<CustomJwtPayload | null>('auth_user', () => null);
  useState<boolean>('auth_logged_in', () => false);
});