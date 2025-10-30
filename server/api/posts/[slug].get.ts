// server/api/posts/[slug].get.ts
import { defineEventHandler, createError } from 'h3';
import { db } from '~/server/db';
import { posts } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
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
    
    // The 'content' field from the schema replaces the 'body' from gray-matter
    return post;

  } catch (error) {
    console.error(`SERVER: Could not find post with slug '${slug}'.`, error);
    throw createError({ statusCode: 500, message: 'Failed to retrieve post.' });
  }
});