'use client';
import Link from 'next/link';
// i18n
import { useTranslations } from 'next-intl';
// Pages
import SocialAccounts from '@/pages/auth/socialAccounts';
// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import RoodxInput from '@/components/roodx/input';
// Icons
import { Loader2 } from 'lucide-react';
// Modules
import { useLoginForm } from '@/modules/auth/useLoginForm';

export default function LoginPage() {
  const { t, form, onSubmit, isLoading } = useLoginForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t('login')}</h1>
          <p className="text-muted-foreground w-full text-sm">{t('loginDescription')}</p>
        </div>
        <div className="grid gap-4">
          <RoodxInput control={form.control} inputType="userInput" name="userInfo" label={t('input.userInfoAndUsername')} type="text" placeholder={t('input.placeholder.userInfo')} />
          <RoodxInput
            forgotPassword={t('forgotPassword?')}
            control={form.control}
            id="password"
            name="password"
            label={t('input.password')}
            type="password"
            placeholder={t('input.placeholder.password')}
          />
        </div>

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? <Loader2 className="animate-spin" /> : t('login')}
        </Button>

        <SocialAccounts />

        <div className="text-center text-sm">
          {t('didntHaveAccount')}{' '}
          <Link href="/signup" className="text-sm underline-offset-4 hover:underline text-end text-primary">
            {t('signup')}
          </Link>
        </div>
      </form>
    </Form>
  );
}
