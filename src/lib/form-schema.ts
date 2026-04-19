// lib/form-schema.ts
import { z } from 'zod';

export const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),

  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters'),

  // ✅ New optional contact number field
  contactNo: z
    .string()
    .optional()
    .or(z.literal('')) // Allow empty string from form
    .refine(
      (val) =>
        !val ||
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          val
        ),
      'Please enter a valid phone number'
    ),
});

export type TFormSchema = z.infer<typeof formSchema>;
