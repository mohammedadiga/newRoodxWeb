'use client';
// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Arrow from '@/components/roodx/arrow';
import RoodxCodeInput from '@/components/roodx/code-input';
// Icons
import { Loader2 } from 'lucide-react';
// Modules
import { useActivationForm } from '@/modules/auth/useSignUpForm';

interface Props {
  onBack: () => void;
}

export default function ActivationPage({ onBack }: Props) {
  const { t, form, handleSubmitCode, onSubmit, isLoading } = useActivationForm();

  return (
    <div className="grid gap-4">
      <Form {...form}>
        <Arrow onBack={onBack} />
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex justify-center w-full">
            <RoodxCodeInput
              control={form.control}
              name="activationCode"
              label={t('input.userInfoAndUsername')}
              type="text"
              placeholder={t('input.placeholder.userInfo')}
              handleSubmitCode={handleSubmitCode}
            />
          </div>
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? <Loader2 className="animate-spin" /> : t('signup')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
