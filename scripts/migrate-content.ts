// scripts/migrate-content.ts
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { db } from '../server/db';
import { posts, likes } from '../server/db/schema';
import { eq } from 'drizzle-orm';

dotenv.config({ path: '.env.development.local' });

const contentDir = path.resolve(process.cwd(), 'content/blog');
const likesDbPath = path.resolve(process.cwd(), 'server/data/likes.json');

async function migrateContent() {
  console.log('--- Starting Content Migration ---');

  // 1. Migrate Posts
  try {
    const filenames = await fs.readdir(contentDir);
    const mdFiles = filenames.filter((fn) => fn.endsWith('.md'));
    console.log(`Found ${mdFiles.length} markdown files to migrate...`);

    for (const filename of mdFiles) {
      const filePath = path.join(contentDir, filename);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const slug = filename.replace('.md', '');

      console.log(`Migrating post: ${slug}`);

      await db.insert(posts).values({
        slug: slug,
        title: data.title,
        description: data.description,
        imageUrl: data.image, // Mapping 'image' from frontmatter to 'imageUrl'
        author: data.author,
        category: data.category,
        content: content, // The body of the markdown
        createdAt: new Date(data.date),
      }).onConflictDoNothing(); // Ignore if a post with the same slug already exists
    }
    console.log('✅ All posts migrated successfully.');
  } catch (error) {
    console.error('❌ Error migrating posts:', error);
  }

  // 2. Migrate Likes
  try {
    const likesData = JSON.parse(await fs.readFile(likesDbPath, 'utf-8'));
    console.log('Migrating like counts...');

    for (const slug in likesData) {
      const likeCount = likesData[slug];

      // Find the post ID for the given slug
      const post = await db.query.posts.findFirst({
        where: eq(posts.slug, slug),
        columns: { id: true },
      });

      if (post) {
        console.log(`Updating likes for ${slug} to ${likeCount}`);
        await db.insert(likes).values({
          postId: post.id,
          count: likeCount,
        }).onConflictDoUpdate({
          target: likes.postId,
          set: { count: likeCount }
        });
      }
    }
    console.log('✅ All like counts migrated successfully.');
  } catch (error) {
    console.error('❌ Error migrating likes:', error);
  }
  
  console.log('--- Migration Complete ---');
}

migrateContent();