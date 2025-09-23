import TripActivity from '@/components/activity/trip-activity';
import Collapsible from '@/components/collapsible';
import { SearchLocation } from '@/components/search-location';
import { WebMap } from '@/components/web-map';
import { useApi } from '@/src/hooks/use-api';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import { IActivity } from '@/src/interfaces/IActivity';
import { ITrip } from '@/src/interfaces/ITrip';
import { useMap } from '@vis.gl/react-google-maps';
import { format, startOfDay } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import { groupBy } from 'lodash-es';
import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';

interface IItinerary {
  date: Date;
  activities: IActivity[];
}

export default function TripView() {
  const map = useMap();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();

  const { result: trip } = useApi<ITrip>(`/api/v1/trips/${tripId}`);
  const { result: activities } = useApi<IActivity[]>(`/api/v1/trips/${tripId}/activities`);
  const { result: documents } = useApi<{ id: string; displayName: string }[]>(`/api/v1/trips/${tripId}/documents`);

  let [itinerary, setItinerary] = useState<IItinerary[]>([]);

  useEffect(() => {
    if (trip && map) {
      const location = trip.centralLocation?.geometry?.location;
      if (location) map.setCenter(location);

      const bounds = trip.centralLocation?.geometry?.viewport;
      if (bounds) map.fitBounds(bounds);
    }
  }, [trip, map]);

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
    <View className="flex flex-row h-full">
      <View
        className="flex grow-[1] basis-[393] h-full py-2"
        style={{
          backgroundColor: useThemeColor({}, 'background'),
        }}
      >
        {trip && (
          <>
            <h1 className="pl-8 text-3xl font-bold pb-4">{trip?.displayName}</h1>
            <article className="pl-8 text-xl pb-8">{trip.centralLocation?.name}</article>
            <SearchLocation></SearchLocation>
            <div style={{ width: '100%' }}>
              {documents?.map((document) => (
                <div key={document.id}>{document.displayName}</div>
              ))}
            </div>
            <div className="flex-col">
              {itinerary?.map((itinerary, index) => (
                <Collapsible
                  key={`itinerary_${index}`}
                  header={format(itinerary.date, 'dd MMM yyyy')}
                  caretSize={32}
                  className="h-[50px] border-b-2 border-slate-600 "
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
      <View className="grow-3 h-full" style={{ flex: 3, height: '100%' }}>
        {Platform.OS === 'web' && <WebMap></WebMap>}
      </View>
    </View>
  );
}
