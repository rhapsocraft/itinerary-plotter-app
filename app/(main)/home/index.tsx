import { useApi } from '@/src/hooks/use-api';
import { Text } from 'react-native';

export default function Home() {
  const { result, isLoading } = useApi<{ status: string }>('/api/v1/maintenance/health-check');

  return (
    <>
      <Text>Hello World!</Text>
    </>
  );
}
