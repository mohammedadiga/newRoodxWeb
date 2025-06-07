'use client';
import { useRouter } from 'next/navigation';
// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import RoodxInput from '@/components/roodx/input';
import Arrow from '@/components/roodx/arrow';
// Icons
import { Loader2 } from 'lucide-react';
// Modules
import { usePasswordEmailForm } from '@/modules/auth/usePasswordForm';

interface Props extends React.ComponentProps<'form'> {
  onNext: () => void;
}

export default function ForgotEmailForm({ onNext }: Props) {
  const { t, form, onSubmit, isLoading } = usePasswordEmailForm(onNext);

  const router = useRouter();

  return (
    <Form {...form}>
      <Arrow onBack={() => router.push('/login')} />
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t('recoveryPassword')}</h1>
          <p className="text-muted-foreground w-full text-sm">{t('forgotPasswordDescription')}</p>
        </div>
        <div className="grid gap-4">
          <RoodxInput control={form.control} label={t('input.userInfoAndUsername')} inputType="userInput" name="userInfo" type="text" placeholder={t('input.placeholder.userInfo')} />
        </div>
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? <Loader2 className="animate-spin" /> : t('next')}
        </Button>
      </form>
    </Form>
  );
}
