'use client';
// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import RoodxInput from '@/components/roodx/input';
import Arrow from '@/components/roodx/arrow';
import RoodxDateSelect from '@/components/roodx/dateSelect';
// Icons
import { Loader2 } from 'lucide-react';
// Modules
import { usePersonalForm } from '@/modules/auth/useSignUpForm';
// pages
import PolicyPrivacy from '@/pages/auth/policyPrivacy';


interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function PersonalPage({ onBack, onNext }: Props) {
  const { t, form, onSubmit, isLoading } = usePersonalForm(onNext);
  return (
    <div className="grid gap-4">
      <Form {...form}>
        <Arrow onBack={onBack} />
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-4">
            <div className="flex flex-col-2 gap-4 justify-between">
              <RoodxInput control={form.control} name="firstname" label={t('input.firstname')} type="text" />
              <RoodxInput control={form.control} name="lastname" label={t('input.lastname')} type="text" />
            </div>
            <RoodxInput control={form.control} name="username" label={t('input.username')} type="text" placeholder={t('input.placeholder.username')} />
            <RoodxDateSelect control={form.control} name="date" label={t('input.birthday')} placeholder={t('input.placeholder.birthday')} />
          </div>
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? <Loader2 className="animate-spin" /> : t('next')}
          </Button>
          <PolicyPrivacy />
        </form>
      </Form>
    </div>
  );
}
