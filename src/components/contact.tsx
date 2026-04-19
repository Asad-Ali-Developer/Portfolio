'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { saveLeadAction } from '@/actions';
import { Button } from '@/components/button';
import { Icons } from '@/components/icons';
import { SectionHeading } from '@/components/section-heading';
import { FlipWords } from '@/components/ui/flip-words';
import { useSectionInView } from '@/hooks/use-section-in-view';
import { formSchema, TFormSchema } from '@/lib/form-schema';
import { cn } from '@/lib/utils';

export const Contact = () => {
  const { ref } = useSectionInView('Contact');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormSchema>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (values: TFormSchema) => {
    // const { data, error } = await sendEmailAction(values);
    const { data, error } = await saveLeadAction(values);

    console.log('Action response:', { data, error });

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(data);
    reset();
  };
  const words = ['better', 'fast', 'sleek', 'cute', 'beautiful', 'modern'];

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="my-10 w-full scroll-mt-28 md:mb-20"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <div className="mb-10 flex items-center justify-center px-4 sm:mb-20">
        <div className="mx-auto text-3xl font-normal text-neutral-600 sm:text-4xl dark:text-neutral-400">
          Let&apos;s build
          <FlipWords words={words} />
          websites together.
        </div>
      </div>
      <SectionHeading
        heading="Get In Touch"
        content={
          <>
            Please contact me directly at{' '}
            <Button
              variant="link"
              className="text-muted-foreground hover:text-foreground h-fit p-0 font-medium underline transition-colors"
              asChild
            >
              <Link href="mailto:asadali.dev512@gmail.com">
                asadali.dev512@gmail.com
              </Link>
            </Button>{' '}
            or through this form.
          </>
        }
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-5"
      >
        {/* Email Field */}
        <div className="w-full max-w-xl">
          <label
            htmlFor="email"
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              errors.email?.message && 'text-destructive'
            )}
          >
            Email <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="hello@gmail.com"
            {...register('email')}
            className={cn(
              'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              errors.email?.message && 'border-destructive'
            )}
          />
          {errors.email?.message && (
            <p className="text-destructive mt-1 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* ✅ NEW: Contact Number Field */}
        <div className="w-full max-w-xl">
          <label
            htmlFor="contactNo"
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              errors.contactNo?.message && 'text-destructive'
            )}
          >
            Contact Number{' '}
            <span className="text-muted-foreground">(Optional)</span>
          </label>
          <input
            type="tel"
            id="contactNo"
            placeholder="+1 (555) 123-4567"
            {...register('contactNo')}
            className={cn(
              'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              errors.contactNo?.message && 'border-destructive'
            )}
          />
          {errors.contactNo?.message && (
            <p className="text-destructive mt-1 text-sm">
              {errors.contactNo.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="w-full max-w-xl">
          <label
            htmlFor="message"
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              errors.message?.message && 'text-destructive'
            )}
          >
            Message <span className="text-destructive">*</span>
          </label>
          <textarea
            id="message"
            placeholder="Hello! What's up?"
            {...register('message')}
            className={cn(
              'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex h-60 w-full resize-none rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              errors.message?.message && 'border-destructive'
            )}
          ></textarea>
          {errors.message?.message && (
            <p className="text-destructive mt-1 text-sm">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button type="submit" size="lg">
          Submit <Icons.arrowRight className="ml-2 size-4" />
        </Button>
      </form>
    </motion.section>
  );
};
