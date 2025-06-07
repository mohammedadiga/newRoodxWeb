import { toast } from 'sonner';
import { formattedDate } from '@/lib/formatted-date';
import { useTranslations } from 'next-intl';

export function useErrorToast() {
  const tError = useTranslations('Error');

  const showErrorToast = (error?: string) => {
    const errorMessage = error ? tError(`common.${error}`) : tError('common.default');
    toast.error(errorMessage, {
      description: `${formattedDate}`,
    });
  };

  return { showErrorToast };
}
