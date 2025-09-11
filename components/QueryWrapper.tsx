"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export default function QueryWrapper({children}: {children:ReactNode}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60,
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
