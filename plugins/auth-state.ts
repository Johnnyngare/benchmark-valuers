import { defineNuxtPlugin, useState } from '#imports';
import type { JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  userId?: number;
  email?: string;
  role?: string;
}

export default defineNuxtPlugin(() => {
  useState<CustomJwtPayload | null>('auth_user', () => null);
  useState<boolean>('auth_logged_in', () => false);
});