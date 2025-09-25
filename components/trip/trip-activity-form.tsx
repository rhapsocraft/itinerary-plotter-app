import { useMapTools } from '@/src/hooks/maps/use-map-tools';
import { IActivity } from '@/src/interfaces/IActivity';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { Pressable, Text, TextInput } from 'react-native';

export type ActivityProps = {
  activity?: IActivity;
  onStopEditing?: () => void;
};

type ActivityInputs = {
  displayName: string;
  description: string;
  scheduleStart: string;
  scheduleEnd: string;
};

export default function TripActivityForm({ activity, onStopEditing }: ActivityProps) {
  const { goTo } = useMapTools();

  const { register } = useForm<ActivityInputs>();

  return (
    <>
      <div className="grid grid-cols-[116px_minmax(0,1fr)] h-full grow-[1]">
        <div className="flex flex-col h-full bg-slate-200 py-3 text-center pl-8 pr-6">
          <div>{activity?.scheduleStart && format(activity.scheduleStart, 'hh:mm aa')}</div>
          {activity?.scheduleEnd && (
            <>
              <div>~</div>
              <div>{format(activity.scheduleEnd, 'hh:mm aa')}</div>
            </>
          )}
        </div>
        <div className="h-full pt-3 flex flex-col gap-1">
          <div className="flex ml-3 flex-row gap-[1em]">
            <div className="font-bold whitespace-nowrap w-full max-w-[360px]">
              <TextInput
                autoFocus={true}
                className="border-[1px] border-slate-500 focus:outline-indigo-500 p-1 rounded w-full bg-white"
                defaultValue={activity?.displayName}
                {...register('displayName')}
              ></TextInput>
            </div>
            <div className="flex flex-row mr-4 ml-auto gap-1">
              <Pressable onPress={onStopEditing}>
                <div className="p-1.5 flex items-center rounded text-red-500 hover:bg-red-500 hover:text-white">
                  <MaterialIcons name="close" className="text-current" size={18}></MaterialIcons>
                </div>
              </Pressable>

              <Pressable>
                <div className="p-1.5 flex items-center rounded text-green-500 hover:bg-green-500 hover:text-white">
                  <MaterialIcons name="check" className="text-current" size={18}></MaterialIcons>
                </div>
              </Pressable>
            </div>
          </div>
          <div className="ml-3 text-slate-700 text-ellipsis line-clamp-3">
            <textarea
              className="border-[1px] border-slate-500 p-1 rounded max-w-[360px] w-full focus:outline-indigo-500 resize-none"
              defaultValue={activity?.description}
              rows={3}
              {...register('description')}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="pl-3 py-2 bg-zinc-200 flex gap-[1em] mb-0 overflow-x-auto col-span-2 border-[1px] border-slate-300">
        <Pressable className="border-indigo-500 border-2 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded whitespace-nowrap px-2 py-1 text-xs ">
          <div className="flex items-center gap-1">
            <MaterialIcons name="location-pin" className="text-current" size={16}></MaterialIcons>
            <Text className="text-current">Add Location</Text>
          </div>
        </Pressable>
        {activity?.locations?.length &&
          activity?.locations?.map((location) => (
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
    </>
  );
}
