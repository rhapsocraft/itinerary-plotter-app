import Collapsible from '@/components/collapsible';
import TripActivityForm from '@/components/trip/trip-activity-form';
import { TripActivityState } from '@/components/trip/trip-activity-state';
import { WebMap } from '@/components/web-map';
import { useMapTools } from '@/src/hooks/maps/use-map-tools';
import { useApi } from '@/src/hooks/use-api';
import { IActivity, IActivityState } from '@/src/interfaces/IActivity';
import { ITrip } from '@/src/interfaces/ITrip';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useMap } from '@vis.gl/react-google-maps';
import { format, startOfDay } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import { groupBy } from 'lodash-es';
import { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';

interface IItinerary {
  date: Date;
  activityStates: IActivityState[];
  isCreatingActivity?: boolean;
}

export default function TripView() {
  const map = useMap();

  const { goTo } = useMapTools();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();

  const { result: trip } = useApi<ITrip>(`/api/v1/trips/${tripId}`);
  const { result: activities } = useApi<IActivity[]>(`/api/v1/trips/${tripId}/activities`);
  const { result: documents } = useApi<{ id: string; displayName: string }[]>(`/api/v1/trips/${tripId}/documents`);

  const [itinerary, setItinerary] = useState<IItinerary[]>([]);

  useEffect(() => {
    if (trip && map) {
      const location = trip.centralLocation?.geometry?.location;
      if (location) map.setCenter(location);

      const bounds = trip.centralLocation?.geometry?.viewport;
      if (bounds) map.fitBounds(bounds);
    }
  }, [trip, map]);

  useEffect(() => {
    if (activities) {
      const newItinerary = Object.entries(groupBy(activities, (activity) => startOfDay(activity.scheduleStart))).map<IItinerary>(
        ([dateString, activities]) => ({
          date: new Date(dateString),
          activityStates:
            activities.map((activity) => ({
              activity,
            })) ?? [],
          isCreatingActivity: false,
        }),
      );

      setItinerary(newItinerary);
    }
  }, [activities]);

  return (
    <View className="flex flex-row h-full text-slate-800 bg-zinc-100">
      <ScrollView className="flex grow-[1] basis-[393] h-full shadow-md">
        {trip && (
          <>
            <article className="pl-8 pb-8">
              <h1 className="text-3xl font-bold pb-4 py-2">{trip?.displayName}</h1>
              <Pressable
                className="text-indigo-500 flex flex-row items-center text-xl py-2 w-fit gap-2 rounded"
                onPress={() => goTo(trip.centralLocation?.geometry)}
              >
                <MaterialIcons className="text-current" name="location-pin" size={24}></MaterialIcons>
                <div>{trip.centralLocation?.name}</div>
              </Pressable>
            </article>

            <article>
              <div className="mx-4 h-[50px] bg-white rounded-t-xl border-[1px] border-b-0 border-slate-300 px-4 flex flex-row items-center">
                <div className="text-xl font-bold">Documents</div>
              </div>
              <div className="w-full h-[120px] bg-white mb-8  border-y-[1px] border-slate-300">
                {documents?.map((document) => (
                  <div key={document.id}>{document.displayName}</div>
                ))}
              </div>
            </article>

            <article className="flex-col">
              <div className="mx-4 h-[50px] rounded-t-xl px-4 flex flex-row items-center bg-white border-[1px] border-b-0 border-slate-300">
                <div className="text-xl font-bold">Itinerary</div>
              </div>
              {itinerary?.map((itinerary, itineraryIndex) => (
                <Collapsible
                  key={`itinerary_${itineraryIndex}`}
                  header={format(itinerary.date, 'dd MMM yyyy')}
                  caretSize={32}
                  className="h-[50px] border-b-[1px] border-slate-600 bg-slate-500 text-slate-50"
                >
                  <div className="flex flex-row items-center h-[40px] w-full bg-slate-100  border-b-[1px] border-slate-400 sticky top-0 z-10">
                    <article className="ml-8 font-semibold">Lorem Ipsum</article>
                    <Pressable
                      className="text-sm ml-auto mr-4 rounded text-indigo-500 p-1.5 hover:bg-indigo-500 hover:text-white"
                      onPress={() => {
                        setItinerary((prevItinerary) => {
                          prevItinerary[itineraryIndex].isCreatingActivity = true;

                          return [...prevItinerary];
                        });
                      }}
                    >
                      <MaterialIcons name="add" className="text-current" size={18}></MaterialIcons>
                    </Pressable>
                  </div>

                  {itinerary?.activityStates.map((activityState, itineraryIndex) => (
                    <div key={activityState.activity.id} className="flex flex-col min-h-[120px] text-sm  border-slate-400 border-b-[1px]">
                      <TripActivityState state={activityState}></TripActivityState>
                    </div>
                  ))}
                  {itinerary.isCreatingActivity && (
                    <div className="grid grid-cols-[116px_minmax(0,1fr)] min-h-[140px] text-sm items-center border-slate-400 border-b-[1px]">
                      <TripActivityForm
                        onStopEditing={() => {
                          setItinerary((prevItinerary) => {
                            prevItinerary[itineraryIndex].isCreatingActivity = false;

                            return [...prevItinerary];
                          });
                        }}
                      ></TripActivityForm>
                    </div>
                  )}
                </Collapsible>
              ))}
            </article>
          </>
        )}
      </ScrollView>
      <View className="grow-3 h-full" style={{ flex: 3, height: '100%' }}>
        {Platform.OS === 'web' && <WebMap bounds={trip?.centralLocation.geometry?.viewport}></WebMap>}
      </View>
    </View>
  );
}
