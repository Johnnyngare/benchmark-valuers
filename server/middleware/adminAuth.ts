import { defineEventHandler, getCookie, createError } from 'h3';
import jsonwebtoken from 'jsonwebtoken';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

interface JwtPayload {
  userId?: number;
  email?: string;
  role?: string;
}

export default defineEventHandler(async (event) => {
  const path = event.path;

  if (path.startsWith('/api/admin') && !path.startsWith('/api/admin/auth')) {
    const authToken = getCookie(event, 'auth_token');

    if (!authToken) {
      throw createError({ statusCode: 401, message: 'Unauthorized: No token provided.' });
    }

    const config = useRuntimeConfig(event);
    const JWT_SECRET = config.jwtSecret;

    try {
      const decoded = jsonwebtoken.verify(authToken, JWT_SECRET) as JwtPayload;

      if (!decoded.userId) {
        throw new Error('Invalid token payload');
      }

      const user = await db.query.users.findFirst({
        where: eq(users.id, decoded.userId),
      });

      if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized: User not found.' });
      }

      if (user.role !== 'admin') {
        throw createError({ statusCode: 403, message: 'Forbidden: Insufficient permissions.' });
      }

      event.context.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

    } catch (err) {
      console.error("Authentication error in server middleware:", err);
      throw createError({ statusCode: 401, message: 'Unauthorized: Invalid or expired token.' });
    }
  }
});