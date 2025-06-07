'use client';
import { useRouter } from 'next/navigation';
// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import RoodxCodeInput from '@/components/roodx/code-input';
import Arrow from '@/components/roodx/arrow';
// Icons
import { Loader2 } from 'lucide-react';
// Modules
import { usePasswordCodeForm } from '@/modules/auth/usePasswordForm';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function ForgotCodeForm({ onBack, onNext }: Props) {
  const { t, form, handleSubmitCode, descriptionText, onSubmit, isLoading } = usePasswordCodeForm(onNext);
  return (
    <Form {...form}>
      <Arrow onBack={onBack} />
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t('verificationCode')}</h1>
          <p className="text-muted-foreground w-full text-sm">{descriptionText}</p>
        </div>
        <div className="grid gap-4">
          <div className="flex justify-center w-full">
            <RoodxCodeInput control={form.control} name="activationCode" label={t('input.userInfoAndUsername')} placeholder={t('input.placeholder.userInfo')} handleSubmitCode={handleSubmitCode} />
          </div>
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? <Loader2 className="animate-spin" /> : t('next')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
