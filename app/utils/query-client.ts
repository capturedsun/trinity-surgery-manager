import { QueryClient } from '@tanstack/react-query';

let clientQueryClientSingleton: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return new QueryClient();
  }

  if (!clientQueryClientSingleton) {
    clientQueryClientSingleton = new QueryClient();
  }

  return clientQueryClientSingleton;
};