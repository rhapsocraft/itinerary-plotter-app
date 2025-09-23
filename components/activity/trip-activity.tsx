import { IActivity } from '@/src/interfaces/IActivity';
import { format } from 'date-fns';

export type ActivityProps = {
  activity: IActivity;
};

export default function Activity({ activity }: ActivityProps) {
  return (
    <div className="flex flex-row gap-x-3 h-[120px] text-sm items-center border-b-2 border-slate-500">
      <div className="flex flex-col basis-[116px] shrink-0 h-full bg-slate-200 py-3 text-center pl-8 pr-6">
        <div>{format(activity.scheduleStart, 'hh:mm aa')}</div>
        {activity.scheduleEnd && (
          <>
            <div>~</div>
            <div>{format(activity.scheduleEnd, 'hh:mm aa')}</div>
          </>
        )}
      </div>
      <div className="h-full py-3 grow-[1] basis-[70px] flex flex-col">
        <div className="font-bold">{activity.displayName}</div>
        <div className="text-slate-700 text-ellipsis line-clamp-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
      <div className="h-full grow-[1]"></div>
    </div>
  );
}
