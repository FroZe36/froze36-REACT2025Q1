import { z } from 'zod';

const passwordSchema = z
  .string()
  .refine(
    (val) => /[A-Z]/.test(val),
    'Password must contain at least one uppercase letter'
  )
  .refine(
    (val) => /[a-z]/.test(val),
    'Password must contain at least one lowercase letter'
  )
  .refine((val) => /\d/.test(val), 'Password must contain at least one number')
  .refine(
    (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
    'Password must contain at least one special character'
  );

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .refine(
        (val) => /^[A-Z][a-z]*$/.test(val),
        'Name must start with an uppercase letter'
      ),
    age: z
      .number({ message: 'Age is required' })
      .min(0, 'Age must be a non-negative number'),
    email: z.string().email('Invalid email address'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
    gender: z.string({ message: 'Gender is required' }),
    acceptTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        'You must accept the terms and conditions'
      ),
    picture: z
      .union([z.custom<FileList>(), z.instanceof(File)])
      .superRefine((data, ctx) => {
        const validateFile = (file: File) => {
          if (file.size > 2 * 1024 * 1024) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'File size must be less than 2MB',
            });
          }
          if (!['image/jpeg', 'image/png'].includes(file.type)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Only JPEG and PNG images are allowed',
            });
          }
        };
        if (data instanceof FileList) {
          if (data.length === 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Picture is required',
            });
          } else {
            validateFile(data[0]);
          }
        } else if (data instanceof File) {
          if (data.name === '') {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Picture is required',
            });
          }
          validateFile(data);
        }
      }),
    country: z.string().min(1, { message: 'Country is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type FormSchema = z.infer<typeof formSchema>;
