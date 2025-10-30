// server/api/admin/posts/[slug].delete.ts
import { defineEventHandler, createError } from 'h3';
import { db } from '~/server/db';
import { posts } from '~/server/db/schema';
import { eq } from 'drizzle-orm';
import { del } from '@vercel/blob';

export default defineEventHandler(async (event) => {
  // NOTE: Authentication handled by middleware.

  const slug = getRouterParam(event, 'slug');
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Slug is required.' });
  }

  try {
    // Find the post to get the image URL for deletion from Blob storage
    const postToDelete = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (!postToDelete) {
      throw createError({ statusCode: 404, message: 'Post not found.' });
    }

    // Delete the associated image from Vercel Blob if it exists
    if (postToDelete.imageUrl) {
      try {
        await del(postToDelete.imageUrl);
      } catch (blobError) {
        console.warn(`Could not delete blob: ${postToDelete.imageUrl}. Continuing with post deletion. Error:`, blobError);
      }
    }

    // Delete the post from the database
    await db.delete(posts).where(eq(posts.slug, slug));

    return { status: 'success', message: `Post '${slug}' deleted successfully.` };

  } catch (error) {
    console.error('Error deleting post:', error);
    throw createError({ statusCode: 500, message: 'Failed to delete post.' });
  }
});