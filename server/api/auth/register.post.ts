import { defineEventHandler, readBody, createError } from 'h3';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';
import { eq } from 'drizzle-orm';
import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { token, password, email } = await readBody(event);

  if (!token || !password || !email) {
    throw createError({ statusCode: 400, message: 'Token, email, and password are required.' });
  }

  try {
    const decoded = jsonwebtoken.verify(token, config.jwtSecret) as { email?: string, type?: string };

    if (decoded.type !== 'invite' || decoded.email !== email) {
      throw new Error('Invalid token');
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      throw createError({ statusCode: 409, message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      email,
      password: hashedPassword,
      role: 'admin',
    });

    return { status: 'success', message: 'User registered successfully. You can now log in.' };

  } catch (e: any) {
    console.error("Registration failed:", e.message);
    throw createError({ statusCode: 401, message: 'Invalid or expired invitation link.' });
  }
});