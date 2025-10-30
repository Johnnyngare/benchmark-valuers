// server/api/admin/posts/create.post.ts
import { defineEventHandler, readBody, createError } from 'h3';
import { db } from '~/server/db';
import { posts } from '~/server/db/schema';
import { z } from 'zod';

const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().url('Invalid image URL').optional().nullable(),
  category: z.string().optional().nullable(),
  author: z.string().optional().nullable(),
});

export default defineEventHandler(async (event) => {
  // NOTE: Authentication handled by middleware.

  const body = await readBody(event);
  const validation = createPostSchema.safeParse(body);

  if (!validation.success) {
    throw createError({ statusCode: 400, message: 'Invalid post data.', data: validation.error.issues });
  }

  try {
    const [newPost] = await db
      .insert(posts)
      .values(validation.data)
      .returning();
      
    return newPost;

  } catch (error: any) {
    console.error('Error creating post:', error);
    if (error.code === '23505') { // PostgreSQL unique violation for 'slug'
      throw createError({ statusCode: 409, message: `A post with slug '${validation.data.slug}' already exists.` });
    }
    throw createError({ statusCode: 500, message: 'Failed to create post.' });
  }
});