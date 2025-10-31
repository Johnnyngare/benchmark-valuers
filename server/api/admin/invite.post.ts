// server/api/admin/invite.post.ts
import { defineEventHandler, readBody, createError } from 'h3';
import jsonwebtoken from 'jsonwebtoken';
import { Resend } from 'resend';
import { z } from 'zod';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

// Add Zod schema for robust email validation
const inviteSchema = z.object({
  email: z.string().email('A valid email address is required.'),
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const JWT_SECRET = config.jwtSecret;
  const RESEND_API_KEY = config.resendApiKey;
  const BASE_URL = config.public.baseUrl; // Accessing from public runtime config is safer

  // NOTE: Admin authentication is now handled automatically by server/middleware/adminAuth.ts
  // The old manual JWT verification block has been removed.

  // 1. Validate the incoming email address
  const body = await readBody(event);
  const validation = inviteSchema.safeParse(body);

  if (!validation.success) {
    throw createError({ statusCode: 400, message: validation.error.issues[0].message });
  }
  const { email } = validation.data;

  // 2. Check if a user with this email already exists in the database
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (existingUser) {
    throw createError({ statusCode: 409, message: 'A user with this email already exists.' });
  }
  
  // 3. Generate the secure invite token
  const inviteToken = jsonwebtoken.sign(
    { email, type: 'invite' },
    JWT_SECRET,
    { expiresIn: '24h' } // Token is valid for 24 hours
  );
  
  // Construct the registration URL for the email
const registrationUrl = `${BASE_URL}/signup/${inviteToken}?email=${encodeURIComponent(email)}`;  
  // 4. Send the invitation email via Resend
  if (!RESEND_API_KEY) {
    console.error('FATAL: Resend API key is not configured.');
    throw createError({ statusCode: 500, message: 'Email service is not configured.' });
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Benchmark Valuers <onboarding@resend.dev>',
      to: [email],
      subject: 'You have been invited to join the Benchmark Valuers Admin Portal',
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Welcome to Benchmark Valuers!</h2>
          <p>You have been invited to create an account for our admin portal.</p>
          <p>Please click the button below to complete your registration. This link is valid for 24 hours.</p>
          <a href="${registrationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #00A99D; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Register Now</a>
          <p>If you cannot click the button, please copy and paste this URL into your browser:</p>
          <p><a href="${registrationUrl}">${registrationUrl}</a></p>
          <p>Thank you,</p>
          <p>The Benchmark Valuers Team</p>
        </div>
      `,
    });

    return { status: 'success', message: `Invitation sent successfully to ${email}.` };

  } catch (e: any) {
    console.error("Failed to send invitation email via Resend:", e);
    throw createError({ statusCode: 500, message: 'Failed to send invitation email.' });
  }
});