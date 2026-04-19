'use server';

import { Resend } from 'resend';

import { TFormSchema } from '@/lib/form-schema';

const resend = new Resend('re_J3xa9wFw_DJUxEwk7gBc7QAjDfYaSDFEa');

export const sendEmailAction = async ({ email, message }: TFormSchema) => {
  try {
    // ✅ After verifying yourdomain.com
    await resend.emails.send({
      from: 'Contact Form <noreply@asad-ali-portfolio5.netlify.app', // or hello@, contact@, etc.
      to: 'asadali.dev512@gmail.com',
      subject: 'Message from portfolio contact form',
      replyTo: email, // This is correct - replies go to the user
      text: `You've received a message from ${email}\n\n${message}`,
      // Optional: add html version for better formatting
      html: `<p><strong>From:</strong> ${email}</p><p>${message}</p>`,
    });

    return {
      data: 'Email sent successfully!',
    };
  } catch (error) {
    console.error('Resend error:', error);
    return { error: 'Something went wrong!' };
  }
};
