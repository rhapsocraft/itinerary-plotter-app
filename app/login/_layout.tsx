import { Slot } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

export default function RootLayout() {
  WebBrowser.maybeCompleteAuthSession();

  return <Slot />;
}
