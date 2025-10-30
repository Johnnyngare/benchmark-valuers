// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv'; // Import dotenv

// Load environment variables from .env.development.local
// Make sure this path is correct relative to your project root
dotenv.config({ path: '.env.development.local' });

export default defineConfig({
  schema: './server/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Now DATABASE_URL will be loaded
  },
});