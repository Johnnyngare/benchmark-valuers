// server/api/auth/login.post.ts
import { defineEventHandler, readBody, setCookie, createError } from 'h3';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const JWT_SECRET = config.jwtSecret;

  if (!JWT_SECRET) {
    throw createError({ statusCode: 500, message: "JWT secret not configured." });
  }

  const { email, password } = await readBody(event);
  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email and password are required.' });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    console.error(`SERVER: Invalid credentials for: ${email}`);
    throw createError({ statusCode: 401, message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.error(`SERVER: Invalid credentials for: ${email}`);
    throw createError({ statusCode: 401, message: 'Invalid credentials' });
  }

  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '7d' });

  // Set secure HTTP-only cookie (This is for browser security)
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  // IMPORTANT: Also return the token in the response body for client-side state sync
  return { status: 'success', token, user: { email: user.email, role: user.role } };
});