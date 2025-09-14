import { useState } from 'react';

export function useApi<ApiResponse>(endpoint: string, options: RequestInit) {
  const [result, setResult] = useState<ApiResponse>();
  const apiUrl: string = process.env.EXPO_PUBLIC_API_URL ?? '';

  if (apiUrl) {
  } else {
    throw new Error('API url not defined');
  }

  fetch(`${apiUrl}${endpoint}`, options).then(async (response) => {
    setResult(await response.json());
  });

  return { result };
}
