import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
// Components
import { FormControl, FormField, FormItem, useFormField } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
// i18n
import { useTranslations } from 'next-intl';

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  const t = useTranslations('Error');
  const body = error ? t(String(error?.message ?? '')) : props.children;

  if (!body) {
    return null;
  }

  return (
    <p data-slot="form-message" id={formMessageId} className={cn('text-destructive text-sm', className)} {...props}>
      {body}
    </p>
  );
}

interface InputProps extends React.ComponentProps<'input'> {
  control: any;
  name: string;
  label?: string;
  query?: string;
  handleSubmitCode: () => void;
  onClearQuery?: () => void;
}

export default function RoodxCodeInput({ className, control, name, handleSubmitCode }: InputProps) {
  const t = useTranslations('Auth');
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle click and submission logic
  const onSubmitCodeClick = () => {
    handleSubmitCode(); // Call the function passed as a prop
    setTimeLeft(120); // Reset the timer to 120 seconds (2 minutes)
  };

  return (
    <div className={cn(className)}>
      <FormField
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <FormItem dir="ltr">
            <FormControl>
              <InputOTP type="tel" inputMode="numeric" pattern="\d*" maxLength={6} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot aria-invalid={!!fieldState.error} index={0} autoFocus />
                  <InputOTPSlot aria-invalid={!!fieldState.error} index={1} />
                  <InputOTPSlot aria-invalid={!!fieldState.error} index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot aria-invalid={!!fieldState.error} index={3} />
                  <InputOTPSlot aria-invalid={!!fieldState.error} index={4} />
                  <InputOTPSlot aria-invalid={!!fieldState.error} index={5} />
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="pt-4">
        {timeLeft > 0 ? (
          <p className="text-sm text-muted-foreground text-center">{`${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`}</p>
        ) : (
          <p className="text-sm text-center">
            {t('VerificationResendText')}{' '}
            <button type="button" className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={onSubmitCodeClick}>
              {t('VerificationResendButton')}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
