import { defineEventHandler, readBody, createError } from 'h3';
import { Resend } from 'resend';
import { z } from 'zod';

// Define a schema for strong server-side validation using Zod
const contactFormSchema = z.object({
  firstName: z.string().trim().min(1, 'First Name is required'),
  lastName: z.string().trim().min(1, 'Last Name is required'),
  email: z.string().email('Please provide a valid email address'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Service is required'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters long'),
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const RESEND_API_KEY = config.resendApiKey;

  if (!RESEND_API_KEY) {
    console.error('FATAL: Resend API key is not configured.');
    throw createError({
      statusCode: 500,
      message: 'Internal server error: Email service is not configured.',
    });
  }

  const body = await readBody(event);
  const validation = contactFormSchema.safeParse(body);

  // If validation fails, return a 400 error with details
  if (!validation.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid form data.',
      data: validation.error.issues,
    });
  }

  const { firstName, lastName, email, phone, service, message } = validation.data;
  
  // Instantiate the Resend client
  const resend = new Resend(RESEND_API_KEY);

  try {
    // Send the email to your company
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Must be this domain for dev/unverified domains
      to: 'info@benchmarkvaluers.co.ke', // The company's email address
      reply_to: email, // Set the user's email as the reply-to address
      subject: `New Contact Form Submission - ${service}`,
      html: `
        <h1>New Website Contact Form Submission</h1>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service of Interest:</strong> ${service}</p>
        <hr>
        <h2>Message:</h2>
        <p>${message}</p>
      `,
    });

    return { status: 'success', message: 'Your message has been sent successfully!' };

  } catch (error) {
    console.error('Failed to send email via Resend:', error);
    throw createError({
      statusCode: 500,
      message: 'There was an issue sending your message. Please try again later.',
    });
  }
});