import { useRouter } from 'next/navigation';
// utils
import { formattedDate } from '@/lib/formatted-date';
// hook
import useCountryFlag from '@/hooks/useCountryFlag';
import { useForm } from 'react-hook-form';
// Validator
import { ForgotPasswordSchema, ResetPasswordSchema } from '@/validators/auth/password.validator';
import { ActivationCodeSchema } from '@/validators/auth/signup.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// Components
import { toast } from 'sonner';
// i18n
import { useTranslations } from 'next-intl';
// Redux
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { useActivatePasswordMutation, useForgotPasswordMutation, useResetPasswordMutation } from '@/store/api/router/auth/password.route';
// hooks
import { useErrorToast } from '@/hooks/useErrorToast';

const trs = 'Auth';

export function usePasswordEmailForm(onNext: () => void) {
  const t = useTranslations(trs);

  const { handleCheckEmailOrPhone } = useCountryFlag();
  const { showErrorToast } = useErrorToast();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      userInfo: '',
    },
  });

  // redux Slices
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    const userData = (await handleCheckEmailOrPhone(data.userInfo)) as string;
    try {
      const response = await forgotPassword({ userInfo: userData }).unwrap();
      if (response) {
        onNext();
      }
    } catch (error: any) {
      if (error?.data?.errorCode === 'AUTH_USER_NOT_FOUND') {
        form.setError('userInfo', { type: 'manual', message: 'userNotFound' });
      } else if (error?.data?.errorCode === 'AUTH_TOO_MANY_ATTEMPTS') {
        form.setError('userInfo', { type: 'manual', message: 'forgotPasswordTooMany' });
      } else {
        showErrorToast();
      }
    }
  };

  return { t, form, onSubmit, isLoading };
}

export function usePasswordCodeForm(onNext: () => void) {
  const t = useTranslations(trs);

  const { showErrorToast } = useErrorToast();

  const form = useForm<z.infer<typeof ActivationCodeSchema>>({
    resolver: zodResolver(ActivationCodeSchema),
    defaultValues: {
      activationCode: '',
    },
  });

  // redux Slices
  const { message, maskedContact, userInfo, token } = useAppSelector((state: RootState) => state.auth);
  const [forgotPassword] = useForgotPasswordMutation();
  const [activatePassword, { isLoading }] = useActivatePasswordMutation();

  let descriptionText = '';
  if (message === 'please_check_your_phone_number') {
    descriptionText = `${t('verificationPhoneDescription')} ${maskedContact}`;
  } else {
    descriptionText = `${t('verificationEmailDescription')} ${maskedContact}`;
  }

  const handleSubmitCode = async () => {
    const ForgotPasswordData: Partial<IAuth> = { userInfo };

    try {
      await forgotPassword(ForgotPasswordData).unwrap();
    } catch (error: any) {
      if (error?.data?.errorCode === 'AUTH_TOO_MANY_ATTEMPTS') {
        form.setError('activationCode', { type: 'manual', message: 'forgotPasswordTooMany' });
      }
      showErrorToast();
    }
  };

  const onSubmit = async (data: z.infer<typeof ActivationCodeSchema>) => {
    const activationData = { activationToken: token, activationCode: data.activationCode };
    try {
      const response = await activatePassword(activationData).unwrap();
      if (response) onNext();
    } catch (error: any) {
      if (error?.data?.error === 'Invalid reset token or code') {
        form.setError('activationCode', { type: 'manual', message: 'InvalidActivation' });
      }
      showErrorToast();
    }
  };

  return { t, form, descriptionText, handleSubmitCode, onSubmit, isLoading };
}

export function usePasswordResetForm() {
  const t = useTranslations(trs);
  const tSuccess = useTranslations('Success');

  const { showErrorToast } = useErrorToast();
  const router = useRouter(); // Initialize the router

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // redux Slices
  const { userId, userToken } = useAppSelector((state: RootState) => state.auth);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data: any) => {
    const resertData = { userId, token: userToken, password: data.password, confirmPassword: data.confirmPassword };
    try {
      const response = await resetPassword(resertData).unwrap();
      if (response) {
        toast.success(tSuccess('passwordResetSuccessfully'), {
          description: `${formattedDate}`,
        });
        router.push('/login');
      }
    } catch (error: any) {
      showErrorToast();
    }
  };

  return { t, form, onSubmit, isLoading };
}
