import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { defaultLocale } from '@/i18n';

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const locale = (await cookieStore).get('language')?.value ?? defaultLocale;

  return {
    locale,
    messages: (await import(`@/locales/${locale}.json`)).default,
  };
});
