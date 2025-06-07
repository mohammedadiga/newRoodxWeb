'use client';
import ThemeProvider from '@/providers/theme.provider';
import { ReduxProvider } from '@/providers/redux.provider';
import { IntlProvider } from '@/providers/nextIntlClient.provider';
import React from 'react';

export function CombinedProvider({ children, locale, messages }: { children: React.ReactNode; locale: string; messages: any }) {
  return (
    <ReduxProvider>
      <IntlProvider locale={locale} messages={messages}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </IntlProvider>
    </ReduxProvider>
  );
}
