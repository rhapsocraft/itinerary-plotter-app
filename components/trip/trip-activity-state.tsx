import { IActivityState } from '@/src/interfaces/IActivity';
import { useState } from 'react';
import TripActivity from './trip-activity';
import TripActivityForm from './trip-activity-form';

export function TripActivityState({ state }: { state: IActivityState }) {
  const [isEditing, setEditing] = useState<boolean>(false);

  return (
    <>
      {isEditing ? (
        <TripActivityForm activity={state.activity} onStopEditing={() => setEditing(false)}></TripActivityForm>
      ) : (
        <TripActivity activity={state.activity} onStartEditing={() => setEditing(true)}></TripActivity>
      )}
    </>
  );
}
