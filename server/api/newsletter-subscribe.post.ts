import { defineEventHandler, readBody, createError,} from 'h3';
import { Resend } from 'resend';
import { z } from 'zod';
import { useRuntimeConfig } from '#imports';

const newsletterSchema = z.object({
  email: z.string().email('A valid email address is required for subscription.'),
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const RESEND_API_KEY = config.resendApiKey;
  const ADMIN_EMAIL = 'info@benchmarkvaluers.co.ke';

  if (!RESEND_API_KEY) {
    console.error('FATAL: Resend API key is not configured.');
    throw createError({ statusCode: 500, message: 'Internal server error: Email service is not configured.' });
  }

  const body = await readBody(event);
  const validation = newsletterSchema.safeParse(body);

  if (!validation.success) {
    console.error('Newsletter subscription validation failed:', validation.error.issues);
    throw createError({ statusCode: 400, message: 'Invalid email address provided.', data: validation.error.issues });
  }

  const { email } = validation.data;
  const resend = new Resend(RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Benchmark Valuers <noreply@benchmarkvaluers.co.ke>',
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `New Newsletter Subscription: ${email}`,
      html: `
        <h1>New Newsletter Subscriber!</h1>
        <p>The following email address has subscribed to the Benchmark Valuers newsletter:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>Thank you for growing your audience!</p>
      `,
    });

    return { status: 'success', message: 'You have successfully subscribed to our newsletter!' };

  } catch (error) {
    console.error('Failed to send newsletter subscription email via Resend:', error);
    throw createError({ statusCode: 500, message: 'There was an issue subscribing to the newsletter. Please try again later.' });
  }
});