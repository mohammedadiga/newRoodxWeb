import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, useFormField } from '@/components/ui/form';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Control, FieldValues, Path } from 'react-hook-form';
import { RoodxCalendar } from './multiCalendar';

interface InputProps<T extends FieldValues> {
  disabled?: boolean;
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  range?: boolean;
  className?: string;
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  const t = useTranslations('Error');
  const body = error ? t(String(error?.message ?? '')) : props.children;
  if (!body) return null;
  return (
    <p data-slot="form-message" id={formMessageId} className={cn('text-destructive text-sm', className)} {...props}>
      {body}
    </p>
  );
}

export default function RoodxDateSelect<T extends FieldValues>({ disabled = false, control, name, label, placeholder = 'Pick a date', range = false, className }: InputProps<T>) {
  const currentYear = new Date().getFullYear();
  const today = new Date();

  const fromYear = currentYear - 70;
  const toYear = range ? currentYear + 20 : currentYear;

  const minDate = new Date(fromYear, 0, 1);
  const maxDate = range ? new Date(toYear, 11, 31) : today;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="flex flex-col">
          {label && <FormLabel>{label}</FormLabel>}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  variant="secondary"
                  aria-invalid={!!fieldState.invalid}
                  className={cn('w-full bg-transparent dark:bg-muted/30 pl-3 text-left font-normal border', !field.value && 'text-muted-foreground')}
                >
                  {field.value ? format(new Date(field.value), 'PPP') : placeholder}
                  <CalendarIcon className="ltr:ml-auto rtl:mr-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-auto p-0" align="center">
              <RoodxCalendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => date && field.onChange(date.toISOString())}
                disabled={(date) => date < minDate || date > maxDate}
                captionLayout="dropdown-buttons"
                fromYear={fromYear}
                toYear={toYear}
                initialFocus
              />
            </DropdownMenuContent>
          </DropdownMenu>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
