// server/db/index.ts
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres'; // Make sure you have @vercel/postgres installed
import * as schema from './schema'; // Import all your defined schemas

// Create the Drizzle DB client instance
// The 'sql' tag is from @vercel/postgres and uses the DATABASE_URL env variable automatically.
export const db = drizzle(sql, { schema });