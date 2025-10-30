// scripts/create-admin.ts
import dotenv from 'dotenv';
import { db } from '../server/db';
import { users } from '../server/db/schema';
import bcrypt from 'bcryptjs';
import prompts from 'prompts';

// Load environment variables from .env.development.local
dotenv.config({ path: '.env.development.local' });

async function createAdmin() {
  console.log('--- Create First Admin User ---');

  const response = await prompts([
    {
      type: 'text',
      name: 'email',
      message: 'Enter the admin\'s email address:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter a strong password:',
    },
  ]);

  if (!response.email || !response.password) {
    console.error('Email and password are required. Aborting.');
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(response.password, 10);

    await db.insert(users).values({
      email: response.email,
      password: hashedPassword,
      role: 'admin', // Ensure the role is set to 'admin'
    });

    console.log(`✅ Admin user '${response.email}' created successfully!`);
  } catch (error: any) {
    if (error.code === '23505') {
      console.error(`❌ Error: A user with the email '${response.email}' already exists.`);
    } else {
      console.error('❌ An unexpected error occurred:', error);
    }
  }
}

createAdmin();