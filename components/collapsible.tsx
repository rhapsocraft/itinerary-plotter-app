import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PropsWithChildren, useState } from 'react';
import { Pressable, View } from 'react-native';

interface CollapsibleProps extends React.ComponentProps<'div'> {
  header: string;
}

export default function Collapsible({ header, children, style }: PropsWithChildren<CollapsibleProps>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{}}>
      <Pressable onPress={() => setIsOpen(!isOpen)}>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
          <span>{header}</span>
          <MaterialIcons name="chevron-right" size={24} style={{ ...(!isOpen && { transform: 'rotate(90deg)' }) }} />
        </div>
      </Pressable>
      {isOpen && <View>{children}</View>}
    </div>
  );
}
