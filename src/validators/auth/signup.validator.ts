import { z } from 'zod';
import { emailSchema, phoneSchema, passwordSchema, firstnameSchema, lastnameSchema, userNameSchema, birthdaySchema, companyNameSchema, dateSchema, activationCodeSchema } from '@/validators/auth';

export const SignUpSchema = z
  .object({
    userInfo: z.string().refine(
      async (value) => {
        // Use async validation for email and phone, returning the final result
        const isEmailValid = await emailSchema.safeParseAsync(value).then((res) => res.success);
        const isPhoneValid = await phoneSchema.safeParseAsync(value).then((res) => res.success);

        return isEmailValid || isPhoneValid;
      },
      {
        message: 'emailOrPhonEmptyError',
      }
    ),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordMismatchError',
    path: ['confirmPassword'],
  });

export const SignUpPersonalSchema = z.object({
  firstname: firstnameSchema,
  lastname: lastnameSchema,
  username: userNameSchema,
  date: birthdaySchema,
});

export const SignUpCompanySchema = z.object({
  companyname: companyNameSchema,
  username: userNameSchema,
  date: dateSchema,
});

export const ActivationCodeSchema = z.object({
  activationCode: activationCodeSchema,
});
