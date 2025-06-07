import { z } from 'zod';
import { emailSchema, userNameSchema, phoneSchema, passwordSchema } from '@/validators/auth';

// Login validation schema
const loginSchema = z.object({
  email: z.string().trim().email({ message: 'invalidEmailFormat' }).min(5, { message: 'emailTooShort' }).max(255, { message: 'emailTooLong' }),
  password: z.string().min(8, { message: 'passwordTooShort' }).max(128, { message: 'passwordTooLong' }),
});

// Async schema for userInfo to handle email, username, or phone validation
export const LoginSchema = z.object({
  userInfo: z.string().refine(
    async (value) => {
      // Email validation
      const isEmailValid = await emailSchema.safeParseAsync(value).then((res) => res.success);
      // UserName validation
      const isUserNameValid = await userNameSchema.safeParseAsync(value).then((res) => res.success);
      // Phone validation
      const isPhoneValid = await phoneSchema.safeParseAsync(value).then((res) => res.success);

      return isEmailValid || isUserNameValid || isPhoneValid;
    },
    {
      message: 'userEmptyError',
    }
  ),
  password: passwordSchema,
});

export { loginSchema };
