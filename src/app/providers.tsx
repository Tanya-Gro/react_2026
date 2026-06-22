'use client';

import { type ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';

import { ThemeProvider } from 'context';
import { makeStore, type AppStore } from './store';

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps): React.JSX.Element => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};
