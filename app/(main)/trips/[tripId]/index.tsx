import TripActivity from '@/components/activity/trip-activity';
import Collapsible from '@/components/collapsible';
import { IActivity } from '@/core/interfaces/IActivity';
import { useApi } from '@/hooks/use-api';
import { useThemeColor } from '@/hooks/use-theme-color';
import { format, startOfDay } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import { groupBy } from 'lodash-es';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

interface IItinerary {
  date: Date;
  activities: IActivity[];
}

export default function TripView() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();

  const { result: trip } = useApi<{ id: string; displayName: string }>(`/api/v1/trips/${tripId}`);
  const { result: activities } = useApi<IActivity[]>(`/api/v1/trips/${tripId}/activities`);
  const { result: documents } = useApi<{ id: string; displayName: string }[]>(`/api/v1/trips/${tripId}/documents`);

  let [itinerary, setItinerary] = useState<IItinerary[]>([]);

  useEffect(() => {
    const newItinerary = Object.entries(groupBy(activities, (activity) => startOfDay(activity.scheduleStart))).map<IItinerary>(
      ([dateString, activities]) => ({
        date: new Date(dateString),
        activities,
      }),
    );

    setItinerary(newItinerary);
  }, [activities]);

  return (
    <View style={{ flexDirection: 'row', height: '100%' }}>
      <View
        style={{
          flex: 2,
          flexBasis: 393,
          height: '100%',
          backgroundColor: useThemeColor({}, 'background'),
          paddingBlock: 8,
          paddingLeft: 24,
        }}
      >
        {trip && (
          <>
            <h1>{trip?.displayName}</h1>
            <div style={{ width: '100%' }}>
              {documents?.map((document) => (
                <div key={document.id}>{document.displayName}</div>
              ))}
            </div>
            <div style={{ flexDirection: 'column' }}>
              {itinerary?.map((itinerary, index) => (
                <Collapsible
                  key={`itinerary_${index}`}
                  header={format(itinerary.date, 'MMM dd, yyyy')}
                  caretSize={32}
                  style={{ minHeight: 30, fontSize: 24 }}
                >
                  {itinerary?.activities.map((activity) => (
                    <TripActivity key={activity.id} activity={activity}></TripActivity>
                  ))}
                </Collapsible>
              ))}
            </div>
          </>
        )}
      </View>
      <View style={{ flex: 3, height: '100%' }}></View>
    </View>
  );
}
