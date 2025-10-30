// server/api/posts/[slug]/like.post.ts
import { defineEventHandler, createError } from 'h3';
import { db } from '~/server/db';
import { posts, likes } from '~/server/db/schema';
import { eq, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Slug is required.' });
  }

  try {
    // Find the post by slug to get its ID
    const post = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
      columns: { id: true } // Only need the ID
    });

    if (!post) {
      throw createError({ statusCode: 404, message: 'Cannot like a post that does not exist.' });
    }

    // Upsert logic: Increment if exists, create if not
    const [result] = await db
      .insert(likes)
      .values({ postId: post.id, count: 1 })
      .onConflictDoUpdate({
        target: likes.postId,
        set: { count: sql`${likes.count} + 1` }
      })
      .returning({ newCount: likes.count });

    return { likes: result.newCount };

  } catch (error) {
    console.error('Error updating like count:', error);
    throw createError({ statusCode: 500, message: 'Failed to update like count.' });
  }
});