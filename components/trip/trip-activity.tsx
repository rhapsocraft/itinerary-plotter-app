import { useMapTools } from '@/src/hooks/maps/use-map-tools';
import { IActivity } from '@/src/interfaces/IActivity';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { format } from 'date-fns';
import { Pressable, Text } from 'react-native';

export type ActivityProps = {
  activity: IActivity;
  onStartEditing?: () => void;
};

export default function TripActivity({ activity, onStartEditing }: ActivityProps) {
  const { goTo } = useMapTools();

  return (
    <>
      <div className="grid grid-cols-[116px_minmax(0,1fr)] h-full grow-[1]">
        <div className="flex flex-col h-full bg-slate-200 py-3 text-center pl-8 pr-6">
          <div>{format(activity.scheduleStart, 'hh:mm aa')}</div>
          {activity.scheduleEnd && (
            <>
              <div>~</div>
              <div>{format(activity.scheduleEnd, 'hh:mm aa')}</div>
            </>
          )}
        </div>
        <div className="h-full pt-3 flex flex-col gap-1">
          <div className="flex ml-3 flex-row gap-[1em]">
            <div className="font-bold whitespace-nowrap w-fit">{activity.displayName}</div>
            <div className="flex flex-row mr-4 ml-auto gap-1">
              <Pressable>
                <div className="p-1.5 flex items-center rounded text-red-500 hover:bg-red-500 hover:text-white">
                  <MaterialIcons name="delete" className="text-current" size={18}></MaterialIcons>
                </div>
              </Pressable>

              <Pressable onPress={onStartEditing}>
                <div className="p-1.5 flex items-center rounded text-indigo-500 hover:bg-indigo-500 hover:text-white">
                  <MaterialIcons name="mode-edit" className="text-current" size={18}></MaterialIcons>
                </div>
              </Pressable>

              <Pressable>
                <div className="p-1.5 flex items-center rounded text-indigo-500 hover:bg-indigo-500 hover:text-white">
                  <MaterialIcons name="remove-red-eye" className="text-current" size={18}></MaterialIcons>
                </div>
              </Pressable>
            </div>
          </div>
          <div className="ml-3 text-slate-700 text-ellipsis line-clamp-3 pb-4">{activity.description}</div>
        </div>
      </div>

      {activity.locations?.length && (
        <div className="pl-3 py-2 bg-zinc-200 flex gap-[1em] mb-0 overflow-x-auto col-span-2 border-[1px] border-slate-300">
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
    </>
  );
}
