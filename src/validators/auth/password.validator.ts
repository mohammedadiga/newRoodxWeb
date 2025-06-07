import { z } from 'zod';
// Validators
import { emailSchema, passwordSchema, phoneSchema, userNameSchema } from '@/validators/auth';

export const ForgotPasswordSchema = z.object({
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
});

export const ResetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordMismatchError',
    path: ['confirmPassword'],
  });
