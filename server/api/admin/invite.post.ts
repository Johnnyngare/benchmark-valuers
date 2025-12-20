import { defineEventHandler, readBody, createError, } from 'h3';
import jsonwebtoken from 'jsonwebtoken';
import { Resend } from 'resend';
import { z } from 'zod';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

const inviteSchema = z.object({
  email: z.string().email('A valid email address is required.'),
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const JWT_SECRET = config.jwtSecret;
  const RESEND_API_KEY = config.resendApiKey;
  const BASE_URL = config.public.baseUrl;

  const body = await readBody(event);
  const validation = inviteSchema.safeParse(body);

  if (!validation.success) {
    throw createError({ statusCode: 400, message: validation.error.issues[0]?.message || 'Invalid email address provided.' });
  }
  const { email } = validation.data;

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (existingUser) {
    throw createError({ statusCode: 409, message: 'A user with this email already exists.' });
  }
  
  const inviteToken = jsonwebtoken.sign(
    { email, type: 'invite' },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  
const registrationUrl = `${BASE_URL}/signup/${inviteToken}?email=${encodeURIComponent(email)}`;  
  if (!RESEND_API_KEY) {
    console.error('FATAL: Resend API key is not configured.');
    throw createError({ statusCode: 500, message: 'Email service is not configured.' });
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Benchmark Valuers <noreply@benchmarkvaluers.co.ke>',
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