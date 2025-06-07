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
import { useCompanyForm } from '@/modules/auth/useSignUpForm';
// pages
import PolicyPrivacy from '@/pages/auth/policyPrivacy';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function CompanyPage({ onBack, onNext }: Props) {
  const { t, form, onSubmit, isLoading } = useCompanyForm(onNext);
  return (
    <div className="grid gap-4">
      <Form {...form}>
        <Arrow onBack={onBack} />
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-4">
            <RoodxInput control={form.control} name="companyname" label={t('input.companyname')} type="text" />
            <RoodxInput control={form.control} name="username" label={t('input.username')} type="text" placeholder={t('input.placeholder.username')} />
            <RoodxDateSelect control={form.control} name="date" label={t('input.companyDate')} placeholder={t('input.placeholder.companyDate')} />
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
