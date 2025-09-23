import { useEffect, useState } from 'react';

export function useApi<ApiResponse>(endpoint: string, options?: RequestInit) {
  const [result, setResult] = useState<ApiResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const apiUrl: string = process.env.EXPO_PUBLIC_API_URL ?? '';

  if (!apiUrl) {
    throw new Error('API url not defined');
  }

  function doFetch() {
    setIsLoading(true);

    fetch(`${apiUrl}${endpoint}`, { credentials: 'include', ...options })
      .then(async (response) => {
        setResult(await response.json());
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(doFetch, [endpoint, apiUrl, options]);

  return { result, isLoading, refetch: doFetch };
}
