import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

interface IntlProviderProps {
  children: ReactNode;
  locale: string;
  messages: Record<string, any>;
}

export function IntlProvider({ children, locale, messages }: IntlProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
