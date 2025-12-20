import { defineEventHandler, readBody, createError } from 'h3';
import { Resend } from 'resend';
import { z } from 'zod';
import { useRuntimeConfig } from '#imports';

const requestQuoteSchema = z.object({
  firstName: z.string().trim().min(1, 'First Name is required'),
  lastName: z.string().trim().min(1, 'Last Name is required'),
  email: z.string().email('Please provide a valid email address'),
  phone: z.string().min(10, 'Phone number is required').max(15, 'Phone number is too long'),
  service: z.string().min(1, 'Service of interest is required'),
  details: z.string().trim().min(10, 'Details for quote must be at least 10 characters long'),
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const RESEND_API_KEY = config.resendApiKey;

  if (!RESEND_API_KEY) {
    console.error('FATAL: Resend API key is not configured.');
    throw createError({ statusCode: 500, message: 'Internal server error: Email service is not configured.' });
  }

  const body = await readBody(event);
  const validation = requestQuoteSchema.safeParse(body);

  if (!validation.success) {
    console.error('RFQ validation failed:', validation.error.issues);
    throw createError({ statusCode: 400, message: 'Invalid quote request data.', data: validation.error.issues });
  }

  const { firstName, lastName, email, phone, service, details } = validation.data;
  const resend = new Resend(RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Benchmark Valuers <noreply@benchmarkvaluers.co.ke>',
      to: 'info@benchmarkvaluers.co.ke',
      replyTo: email,
      subject: `NEW QUOTE REQUEST - ${service} from ${firstName} ${lastName}`,
      html: `
            <h1>New Request for Quote</h1>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service of Interest:</strong> ${service}</p>
            <hr>
            <h2>Details for Quote:</h2>
            <p>${details}</p>
          `,
    });

    return { status: 'success', message: 'Your quote request has been sent successfully!' };

  } catch (error) {
    console.error('Failed to send RFQ email via Resend:', error);
    throw createError({ statusCode: 500, message: 'There was an issue sending your quote request. Please try again later.' });
  }
});