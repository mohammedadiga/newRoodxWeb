import { formattedDate } from '@/lib/formatted-date';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
// hook
import useCountryFlag from '@/hooks/useCountryFlag';
import { useForm } from 'react-hook-form';
// Validator
import { ActivationCodeSchema, SignUpCompanySchema, SignUpPersonalSchema, SignUpSchema } from '@/validators/auth/signup.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// Redux
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useActivateMutation, useCheckemailMutation, useRegisterUserMutation } from '@/store/api/router/auth/signup.route';
import { setEmail } from '@/store/slices/auth/authSlice';
import { RootState } from '@/store';
// hooks
import { useErrorToast } from '@/hooks/useErrorToast';
// i18n
import { useTranslations } from 'next-intl';

const trs = 'Auth';

export function useSignUpForm(onNext: () => void) {
  const t = useTranslations(trs);
  const { handleCheckEmailOrPhone } = useCountryFlag();
  const { showErrorToast } = useErrorToast();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      userInfo: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Rudex
  const dispatch = useAppDispatch();
  const [checkemail, { isLoading }] = useCheckemailMutation();

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    const userInfo = (await handleCheckEmailOrPhone(data.userInfo)) as string;

    try {
      const response = await checkemail(userInfo).unwrap();
      if (response) {
        dispatch(setEmail({ email: response.userData.email, phone: response.userData.phone, password: data.password, confirmPassword: data.confirmPassword }));
        onNext();
      }
    } catch (error: any) {
      console.log(error);
      if (error?.data?.errorCode === 'AUTH_EMAIL_ALREADY_EXISTS') {
        form.setError('userInfo', { type: 'manual', message: 'emailAlreadyExist' });
      } else if (error?.data?.errorCode === 'AUTH_PHONE_ALREADY_EXISTS') {
        form.setError('userInfo', { type: 'manual', message: 'phoneAlreadyExist' });
      } else {
        showErrorToast();
      }
    }
  };
  return { t, form, onSubmit, isLoading };
}

export function usePersonalForm(onNext: () => void) {
  const t = useTranslations(trs);
  const { showErrorToast } = useErrorToast();

  const form = useForm<z.infer<typeof SignUpPersonalSchema>>({
    resolver: zodResolver(SignUpPersonalSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      username: '',
      date: '',
    },
  });

  // redux
  const { email, phone, password, confirmPassword } = useAppSelector((state: RootState) => state.auth);
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const onSubmit = async (data: z.infer<typeof SignUpPersonalSchema>) => {
    const username = data.username.toLowerCase();
    const registerData: Partial<IAuth> = {
      email: email || undefined,
      phone: phone || undefined,
      password,
      confirmPassword,
      firstname: data.firstname,
      lastname: data.lastname,
      username,
      birthday: new Date(data.date).toISOString(),
      accountType: 'personal',
    };

    try {
      const response = await registerUser(registerData).unwrap();
      if (response) {
        onNext();
      }
    } catch (error: any) {
      if (error?.data?.errorCode === 'AUTH_USERNAME_ALREADY_EXISTS') {
        form.setError('username', { type: 'manual', message: 'usernameAlreadyExist' });
      } else {
        showErrorToast();
      }
    }
  };

  return { t, form, onSubmit, isLoading };
}

export function useCompanyForm(onNext: () => void) {
  const t = useTranslations(trs);
  const { showErrorToast } = useErrorToast();

  const form = useForm<z.infer<typeof SignUpCompanySchema>>({
    resolver: zodResolver(SignUpCompanySchema),
    defaultValues: {
      companyname: '',
      username: '',
      date: '',
    },
  });

  // redux
  const { email, phone, password, confirmPassword } = useAppSelector((state: RootState) => state.auth);
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const onSubmit = async (data: z.infer<typeof SignUpCompanySchema>) => {
    const username = data.username.toLowerCase();
    const registerData: Partial<IAuth> = {
      email: email || undefined,
      phone: phone || undefined,
      password,
      confirmPassword,
      companyname: data.companyname,
      username,
      date: new Date(data.date).toISOString(),
      accountType: 'company',
    };

    try {
      const response = await registerUser(registerData).unwrap();
      if (response) {
        onNext();
      }
    } catch (error: any) {
      if (error?.data?.errorCode === 'AUTH_USERNAME_ALREADY_EXISTS') {
        form.setError('username', { type: 'manual', message: 'usernameAlreadyExist' });
      } else {
        showErrorToast();
      }
    }
  };

  return { t, form, onSubmit, isLoading };
}

export function useActivationForm() {
  const t = useTranslations(trs);
  const tSuccess = useTranslations('Success');

  const router = useRouter();

  const { showErrorToast } = useErrorToast();

  const form = useForm<z.infer<typeof ActivationCodeSchema>>({
    resolver: zodResolver(ActivationCodeSchema),
    defaultValues: {
      activationCode: '',
    },
  });

  // redux Slices
  const { email, phone, password, confirmPassword, companyname, firstname, lastname, username, birthday, date, accountType, token } = useAppSelector((state: RootState) => state.auth);
  const [registerUser] = useRegisterUserMutation();
  const [activate, { isLoading }] = useActivateMutation();

  let descriptionText = '';
  if (phone) {
    descriptionText = `${t('verificationPhoneDescription')} ${phone}`;
  } else {
    descriptionText = `${t('verificationEmailDescription')} ${email}`;
  }

  const handleSubmitCode = async () => {
    const registerData: Partial<IAuth> = {
      ...(email ? { email } : { phone }),
      password,
      confirmPassword,
      username,
      accountType,
      ...(companyname ? { companyname } : { firstname, lastname }),
      ...(date ? { date } : { birthday }),
    };

    try {
      await registerUser(registerData).unwrap();
    } catch (error: any) {
      if (error?.data?.errorCode === 'AUTH_USERNAME_ALREADY_EXISTS') {
        form.setError('activationCode', { type: 'manual', message: 'usernameAlreadyExist' });
      } else {
        showErrorToast();
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof ActivationCodeSchema>) => {
    const activationData = { activationToken: token, activationCode: data.activationCode };
    try {
      const response = await activate(activationData).unwrap();
      if (response) {
        toast.success(tSuccess('userRegisteredSuccessfully'), {
          description: `${formattedDate}`,
        });
        router.push('/home');
      }
    } catch (error: any) {
      if (error?.data?.error === 'Invalid activation token or code') {
        form.setError('activationCode', { type: 'manual', message: 'InvalidActivation' });
      }
    }
  };

  return { t, descriptionText, form, handleSubmitCode, onSubmit, isLoading };
}
