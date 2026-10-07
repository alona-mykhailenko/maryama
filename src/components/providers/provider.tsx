'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { ChakraCacheProvider } from './chakra-cache';

export function Provider({ children }: { children: ReactNode }) {
  return (
    <ChakraCacheProvider>
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    </ChakraCacheProvider>
  );
}
