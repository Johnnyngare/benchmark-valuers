// server/db/schema.ts
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// --- Users Table (for your custom auth) ---
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: text('password').notNull(), // Hashed password
  role: varchar('role', { length: 50 }).default('admin').notNull(), // e.g., 'admin', 'editor'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// --- Posts Table ---
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description'),
  imageUrl: text('image_url'), // URL from Vercel Blob
  author: varchar('author', { length: 100 }).default('Admin'),
  category: varchar('category', { length: 100 }),
  content: text('content').notNull(), // The Markdown content
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Define relations if needed (e.g., a post has many likes)
export const postsRelations = relations(posts, ({ one, many }) => ({
  likes: many(likes),
}));

// --- Likes Table ---
export const likes = pgTable('likes', {
  id: serial('id').primaryKey(),
  postId: integer('post_id')
    .references(() => posts.id, { onDelete: 'cascade' })
    .notNull() // <--- CORRECTED: Added parentheses here
    .unique(),
  count: integer('count').default(0).notNull(),
});

// Define relations
export const likesRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
}));