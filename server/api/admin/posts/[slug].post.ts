// server/api/admin/posts/[slug].post.ts
import { defineEventHandler, readBody, createError } from 'h3';
import { db } from '~/server/db';
import { posts } from '~/server/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { del } from '@vercel/blob';

const updatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  category: z.string().optional().nullable(),
  author: z.string().optional().nullable(),
  oldImageUrl: z.string().url().optional().nullable(), // Sent by client to manage blob deletion
});

export default defineEventHandler(async (event) => {
  // NOTE: Authentication handled by middleware
  const slug = getRouterParam(event, 'slug');
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Slug is required in URL.' });
  }

  const body = await readBody(event);
  const validation = updatePostSchema.safeParse(body);

  if (!validation.success) {
    throw createError({ statusCode: 400, message: 'Invalid update data.', data: validation.error.issues });
  }

  const { oldImageUrl, ...updateData } = validation.data;

  try {
    // If image has changed, delete the old one from Vercel Blob
    if (oldImageUrl && oldImageUrl !== updateData.imageUrl) {
      try {
        await del(oldImageUrl);
      } catch (blobError) {
        console.warn(`Could not delete old blob: ${oldImageUrl}.`, blobError);
      }
    }

    const [updatedPost] = await db
      .update(posts)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(posts.slug, slug))
      .returning();

    if (!updatedPost) {
      throw createError({ statusCode: 404, message: 'Post not found to update.' });
    }

    return updatedPost;
  } catch (error) {
    console.error('Error updating post:', error);
    throw createError({ statusCode: 500, message: 'Failed to update post.' });
  }
});