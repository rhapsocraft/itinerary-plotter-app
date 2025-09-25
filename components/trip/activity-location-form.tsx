import { useState } from 'react';
import { TextInput } from 'react-native';

export function ActivityLocationForm() {
  const [searchTerm, setSearchTerm] = useState<string>();
  return (
    <>
      <div className="">
        <TextInput></TextInput>
      </div>
      <div className=""></div>
    </>
  );
}
