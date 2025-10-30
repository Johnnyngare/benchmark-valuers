// server/middleware/adminAuth.ts
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

  // This middleware targets all API routes under `/api/admin/`...
  // ...but EXCLUDES the authentication routes inside `/api/admin/auth/`.
  // This allows users to log in without being blocked by the middleware.
  if (path.startsWith('/api/admin') && !path.startsWith('/api/admin/auth')) {
    const authToken = getCookie(event, 'auth_token');

    if (!authToken) {
      throw createError({ statusCode: 401, message: 'Unauthorized: No token provided.' });
    }

    const config = useRuntimeConfig(event);
    const JWT_SECRET = config.jwtSecret;

    try {
      // 1. Verify the JWT token is valid and not expired
      const decoded = jsonwebtoken.verify(authToken, JWT_SECRET) as JwtPayload;

      if (!decoded.userId) {
        throw new Error('Invalid token payload');
      }

      // 2. Fetch user from the database to ensure they still exist and have permissions.
      // This is a vital security check to handle deleted users or role changes instantly.
      const user = await db.query.users.findFirst({
        where: eq(users.id, decoded.userId),
      });

      if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized: User not found.' });
      }

      // 3. Check if the user has the required 'admin' role
      if (user.role !== 'admin') {
        throw createError({ statusCode: 403, message: 'Forbidden: Insufficient permissions.' });
      }

      // 4. (Optional but good practice) Attach the validated user to the event context
      // This makes it available in your API handlers if you ever need it (e.g., for audit logs).
      event.context.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

    } catch (err) {
      // Catches errors from jwt.verify (e.g., expired token) or our manual checks
      console.error("Authentication error in server middleware:", err);
      throw createError({ statusCode: 401, message: 'Unauthorized: Invalid or expired token.' });
    }
  }
});