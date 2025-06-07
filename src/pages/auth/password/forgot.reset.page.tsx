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
import { usePasswordResetForm } from '@/modules/auth/usePasswordForm';

interface Props {
  onBack: () => void;
}

export default function ForgotResetForm({ onBack }: Props) {
  const { t, form, onSubmit, isLoading } = usePasswordResetForm();

  return (
    <Form {...form}>
      <Arrow onBack={onBack} />
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t('setNewPassword')}</h1>
          <p className="text-muted-foreground w-full text-sm">{t('setNewPasswordDescription')}</p>
        </div>
        <div className="grid gap-4">
          <RoodxInput control={form.control} name="password" label={t('input.password')} type="password" placeholder={t('input.placeholder.password')} />
          <RoodxInput control={form.control} name="confirmPassword" label={t('input.confirmPassword')} type="password" placeholder={t('input.placeholder.password')} />
        </div>
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? <Loader2 className="animate-spin" /> : t('login')}
        </Button>
      </form>
    </Form>
  );
}
