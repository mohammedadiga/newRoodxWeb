import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Hook
import useDirection from '@/hooks/useDirection';
// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, useFormField } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
// Lib
import { cn } from '@/lib/utils';
// icons
import { Check, Eye, EyeOff, Search, X } from 'lucide-react';
// i18n
import { useTranslations } from 'next-intl';
// Hooks
import useCountryFlag from '@/hooks/useCountryFlag';
import { Control, FieldValues, Path } from 'react-hook-form';

interface RoodxInputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  inputType?: 'input' | 'search' | 'textarea' | 'userInput' | 'number';
  control: Control<T>;
  name: Path<T>;
  label?: string;
  query?: string;
  forgotPassword?: string;
  onClearQuery?: () => void;
}

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

export default function RoodxInput<T extends FieldValues>({
  className,
  inputType = 'input',
  control,
  name,
  placeholder,
  label,
  type,
  query,
  onClearQuery,
  forgotPassword,
  ...props
}: RoodxInputProps<T>) {
  const { countryCode, showFlag, showError, handleInputShowFlag } = useCountryFlag();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { direction } = useDirection();

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const handleInputChange = useCallback(
    (value: string) => {
      if (inputType === 'userInput') {
        handleInputShowFlag(value);
      }
    },
    [inputType, handleInputShowFlag]
  );

  const isPasswordField = name.includes('password') || name.includes('confirmPassword');

  return (
    <div className={cn(className)}>
      <FormField
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <FormItem>
            {label && (
              <div className={cn('flex items-center', forgotPassword && isPasswordField && 'justify-between')}>
                <FormLabel>{label}</FormLabel>
                {forgotPassword && isPasswordField && (
                  <Link href="/forgot-password" className="text-sm underline-offset-4 hover:underline text-primary">
                    {forgotPassword}
                  </Link>
                )}
              </div>
            )}
            <FormControl>
              <div className="relative">
                {inputType === 'textarea' ? (
                  <Textarea
                    placeholder={placeholder}
                    style={{
                      unicodeBidi: 'plaintext',
                      overflowY: 'auto', // Enables vertical scrolling
                      resize: 'vertical', // Allows user to resize vertically
                      minHeight: '80px', // Minimum height
                      maxHeight: '120px', // Maximum height before scrolling
                    }}
                    className="scrollbar-thin" // For custom scrollbar styling (optional)
                    aria-invalid={!!fieldState.error}
                    {...field}
                  />
                ) : (
                  <Input
                    dir={isPasswordField ? 'ltr' : direction}
                    style={{ unicodeBidi: 'plaintext' }}
                    type={isPasswordField && isPasswordVisible ? 'text' : type}
                    className={cn({
                      'pl-10': inputType === 'search' || showFlag,
                      'no-spinner': inputType === 'number',
                    })}
                    placeholder={placeholder}
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const inputValue = e.target.value;

                      if (inputType === 'number') {
                        const val = inputValue === '' || inputValue === undefined ? '' : Number(inputValue);
                        field.onChange(isNaN(val as number) ? '' : val);
                      } else {
                        field.onChange(e);
                      }

                      handleInputChange(inputValue);
                    }}
                    aria-invalid={!!fieldState.error}
                    {...props}
                  />
                )}

                {/* Country flag for phone input */}
                {inputType === 'userInput' && showFlag && (
                  <Image
                    src={
                      countryCode.toLowerCase() === 'sy'
                        ? 'https://cdn.creazilla.com/cliparts/3479342/flag-of-syria-1932-1958-1961-1963-clipart-xl.png'
                        : `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`
                    }
                    className="absolute h-auto w-auto left-3 top-1/2 -translate-y-1/2"
                    alt="flag"
                    width={24}
                    height={24}
                    priority
                  />
                )}

                {/* Validation check icon */}
                {inputType === 'userInput' &&
                  showFlag &&
                  (showError ? (
                    <X size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-danger" />
                  ) : (
                    <Check size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-success" />
                  ))}

                {/* Search icon */}
                {inputType === 'search' && <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2" />}

                {/* Clear button for search input */}
                {inputType === 'search' && query && (
                  <Button type="button" variant="link" size="icon" onClick={onClearQuery} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X size={24} />
                  </Button>
                )}

                {/* Password visibility toggle */}
                {isPasswordField && (
                  <Button
                    type="button"
                    variant="link"
                    size="icon"
                    onClick={togglePasswordVisibility}
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                  >
                    {isPasswordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                  </Button>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
