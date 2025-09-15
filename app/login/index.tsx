import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Button } from 'react-native';

export default function Login() {
  const router = useRouter();

  async function openAuthSession() {
    const redirectUrl = Linking.createURL('/login/success');
    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/auth/google?authRedirect=${redirectUrl}`;

    const result = await WebBrowser.openAuthSessionAsync(apiUrl, redirectUrl);

    if (result.type === 'success') {
      router.navigate('/home');
    }
  }

  return <Button title="Login via Google" onPress={openAuthSession}></Button>;
}
