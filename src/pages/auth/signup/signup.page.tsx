'use client';
import Link from 'next/link';
// Pages
import SocialAccounts from '@/pages/auth/socialAccounts';
// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import RoodxInput from '@/components/roodx/input';
// Icons
import { Loader2 } from 'lucide-react';
// Modules
import { useSignUpForm } from '@/modules/auth/useSignUpForm';

interface Props {
  onNext: () => void;
}

export default function SignupPage({ onNext }: Props) {
  const { t, form, onSubmit, isLoading } = useSignUpForm(onNext);

  return (
    <div className="grid gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-4">
            <RoodxInput control={form.control} inputType="userInput" name="userInfo" label={t('input.userInfo')} type="text" placeholder={t('input.placeholder.userInfo')} />
            <RoodxInput control={form.control} name="password" label={t('input.password')} type="password" placeholder={t('input.placeholder.password')} />
            <RoodxInput control={form.control} name="confirmPassword" label={t('input.confirmPassword')} type="password" placeholder={t('input.placeholder.password')} />
          </div>
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? <Loader2 className="animate-spin" /> : t('next')}
          </Button>
          <SocialAccounts />
          <div className="text-center text-sm">
            {t('alreadyHaveAccount')}{' '}
            <Link href="/login" className="text-sm underline-offset-4 hover:underline text-end text-primary">
              {t('login')}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
