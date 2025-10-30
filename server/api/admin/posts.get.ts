// server/api/admin/posts.get.ts
import { defineEventHandler, createError } from 'h3';
import { db } from '~/server/db';
import { posts } from '~/server/db/schema';
import { desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  // NOTE: Authentication handled by middleware.
  try {
    const allPosts = await db.query.posts.findMany({
      orderBy: [desc(posts.createdAt)],
    });
    return allPosts;
  } catch (error) {
    console.error('Error fetching admin posts:', error);
    throw createError({ statusCode: 500, message: 'Failed to fetch posts.' });
  }
});