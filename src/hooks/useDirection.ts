'use client';
import { useLocale } from 'next-intl';

export default function useDirection() {
  const locale = useLocale();  
  const isRTL = locale === 'ar'; // أضف لغات أخرى إذا احتجت
  const direction: 'rtl' | 'ltr' = isRTL ? 'rtl' : 'ltr';

  return {
    locale,
    isRTL,
    direction,
  };
}
