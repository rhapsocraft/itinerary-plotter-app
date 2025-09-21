import { Text } from 'react-native';

export type ActivityProps = {
  activity: {
    id?: string;
    displayName?: string;
  };
};

export default function Activity({ activity }: ActivityProps) {
  return <Text>{activity.id}</Text>;
}
