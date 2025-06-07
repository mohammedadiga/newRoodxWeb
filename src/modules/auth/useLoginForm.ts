import { useRouter } from 'next/navigation';
// utils
import { formattedDate } from '@/lib/formatted-date';
// hook
import useCountryFlag from '@/hooks/useCountryFlag';
import { useForm } from 'react-hook-form';
// Validator
import { LoginSchema } from '@/validators/auth/login.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// Components
import { toast } from 'sonner';
// i18n
import { useTranslations } from 'next-intl';
// Redux
import { useLoginMutation } from '@/store/api/router/auth/login.route';
// hooks
import { useErrorToast } from '@/hooks/useErrorToast';

export function useLoginForm() {
  const t = useTranslations('Auth');
  const router = useRouter(); // Initialize the router
  const tSuccess = useTranslations('Success');

  const { handleCheckEmailOrPhone } = useCountryFlag();
  const { showErrorToast } = useErrorToast();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      userInfo: '',
      password: '',
    },
  });

  // Rudex
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const userData = (await handleCheckEmailOrPhone(data.userInfo)) as string;

    try {
      const response = await login({ userInfo: userData, password: data.password }).unwrap();
      if (response) {
        toast.success(tSuccess('userLoginSuccessfully'), {
          description: `${formattedDate}`,
        });
        router.push('/home');
      }
    } catch (error: any) {
      if (error?.data?.errorCode === 'AUTH_USER_NOT_FOUND') {
        form.setError('userInfo', { type: 'manual', message: '' });
        form.setError('password', { type: 'manual', message: 'invalidUsernameOrPassword' });
      } else {
        showErrorToast();
      }
    }
  };

  return { t, form, onSubmit, isLoading };
}
