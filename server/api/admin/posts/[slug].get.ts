// server/api/admin/posts/[slug].get.ts
import { defineEventHandler, createError } from 'h3';
import { db } from '~/server/db';
import { posts } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  // NOTE: Authentication is handled by server middleware
  const slug = getRouterParam(event, 'slug');
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Slug is required.' });
  }

  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (!post) {
      throw createError({ statusCode: 404, message: 'Post not found.' });
    }

    return post;
  } catch (error) {
    console.error(`Error fetching post '${slug}':`, error);
    throw createError({ statusCode: 500, message: 'Failed to retrieve post.' });
  }
});