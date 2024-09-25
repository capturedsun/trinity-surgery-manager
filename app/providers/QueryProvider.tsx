"use client"

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

interface Props {
  children?: React.ReactNode
}

let clientQueryClientSingleton: QueryClient | undefined = undefined;

// export const getQueryClient = () => {
//   if (typeof window === 'undefined') {
//     console.log("getQueryClient: window is undefined")
//     return new QueryClient();
//   }

//   if (!clientQueryClientSingleton) {
//     clientQueryClientSingleton = new QueryClient();
//   }

//   return clientQueryClientSingleton;
// };

export function QueryProvider({ children }: Props) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}