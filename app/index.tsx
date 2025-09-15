import { Redirect } from 'expo-router';

export default function RootApp() {
  return <Redirect href={'/login'}></Redirect>;
}
