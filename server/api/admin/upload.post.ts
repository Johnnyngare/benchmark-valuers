// server/api/admin/upload.post.ts
import { defineEventHandler, createError } from 'h3';
import { put } from '@vercel/blob';

export default defineEventHandler(async (event) => {
  // NOTE: Authentication should be handled by middleware for all admin routes.

  const formData = await readMultipartFormData(event);
  const file = formData?.find(f => f.name === 'image');

  if (!file || !file.data || !file.filename) {
    throw createError({ statusCode: 400, message: 'No file provided.' });
  }

  try {
    const uniqueFilename = `${Date.now()}-${file.filename}`;
    const blob = await put(uniqueFilename, file.data, {
      access: 'public',
      contentType: file.type,
    });

    // Return the public URL of the uploaded file
    return { url: blob.url };

  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    throw createError({ statusCode: 500, message: 'Failed to upload image.' });
  }
});