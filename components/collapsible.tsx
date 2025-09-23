import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PropsWithChildren, useState } from 'react';
import { Pressable, View } from 'react-native';

interface CollapsibleProps extends React.ComponentProps<'div'> {
  header: string;
  caretSize?: number;
}

export default function Collapsible({ header, caretSize, children, style, className }: PropsWithChildren<CollapsibleProps>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Pressable onPress={() => setIsOpen(!isOpen)} className={className}>
        <div className="flex grow-[1] justify-between items-center" style={style}>
          <span className="uppercase pl-8">{header}</span>
          <div className="w-[50] flex justify-center align-center">
            <MaterialIcons
              name="chevron-right"
              className="h-min text-current"
              size={caretSize ?? 32}
              style={{ ...(!isOpen && { transform: 'rotate(90deg)' }) }}
            />
          </div>
        </div>
      </Pressable>
      {isOpen && <View>{children}</View>}
    </>
  );
}
