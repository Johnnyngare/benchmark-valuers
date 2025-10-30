// server/api/posts.get.ts
import { defineEventHandler, createError, getQuery } from 'h3';
import { db } from '~/server/db';
import { posts } from '~/server/db/schema';
import { desc, like, eq, sql, count } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 6;
    const categoryQuery = query.category as string;
    const searchQuery = (query.search as string || '').toLowerCase();

    // Base query for fetching posts
    let queryBuilder = db.select().from(posts).orderBy(desc(posts.createdAt));

    // Base query for counting total posts (more efficient)
    let countBuilder = db.select({ value: count() }).from(posts);

    // Apply filters to both queries
    if (categoryQuery && categoryQuery !== 'All Posts') {
      queryBuilder = queryBuilder.where(eq(posts.category, categoryQuery));
      countBuilder = countBuilder.where(eq(posts.category, categoryQuery));
    }
    if (searchQuery) {
      queryBuilder = queryBuilder.where(like(posts.title, `%${searchQuery}%`));
      countBuilder = countBuilder.where(like(posts.title, `%${searchQuery}%`));
    }

    // Execute both queries
    const paginatedPosts = await queryBuilder.limit(limit).offset((page - 1) * limit);
    const totalResult = await countBuilder;
    const totalPosts = totalResult[0].value;

    return {
      posts: paginatedPosts,
      totalPosts,
      currentPage: page,
      postsPerPage: limit,
      totalPages: Math.ceil(totalPosts / limit),
    };

  } catch (error: any) {
    console.error('SERVER: Critical error reading public posts:', error);
    throw createError({ statusCode: 500, message: 'Failed to fetch blog posts.' });
  }
});