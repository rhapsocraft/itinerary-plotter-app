import { useMapTools } from '@/src/hooks/maps/use-map-tools';
import { IActivity } from '@/src/interfaces/IActivity';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { format } from 'date-fns';
import { Pressable, Text } from 'react-native';

export type ActivityProps = {
  activity: IActivity;
};

export default function Activity({ activity }: ActivityProps) {
  const { goTo } = useMapTools();

  return (
    <div className="grid grid-cols-[116px_minmax(0,1fr)] h-[140px] text-sm items-center border-b-2 border-slate-500">
      <div className="flex flex-col h-full bg-slate-200 py-3 text-center pl-8 pr-6">
        <div>{format(activity.scheduleStart, 'hh:mm aa')}</div>
        {activity.scheduleEnd && (
          <>
            <div>~</div>
            <div>{format(activity.scheduleEnd, 'hh:mm aa')}</div>
          </>
        )}
      </div>
      <div className="h-full pt-3 flex flex-col">
        <div className="flex ml-3 flex-row gap-[1em]">
          <div className="font-bold whitespace-nowrap w-fit">{activity.displayName}</div>
        </div>
        <div className="ml-3 text-slate-700 text-ellipsis line-clamp-3">{activity.description}</div>

        {activity.locations?.length && (
          <div className="pl-3 py-2 bg-zinc-200 flex gap-[1em] mb-0 mt-auto overflow-x-auto">
            {activity.locations?.map((location) => (
              <Pressable
                key={location.place_id}
                className="bg-indigo-500 rounded whitespace-nowrap px-2 py-1 text-xs"
                onPress={() => {
                  goTo(location?.geometry);
                }}
              >
                <div className="flex items-center gap-1">
                  <MaterialIcons name="location-pin" className="text-white" size={16}></MaterialIcons>
                  <Text className="text-white">{location.name}</Text>
                </div>
              </Pressable>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
