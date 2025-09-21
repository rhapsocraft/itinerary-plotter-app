import { IActivity } from '@/src/core/interfaces/IActivity';
import { format } from 'date-fns';

export type ActivityProps = {
  activity: IActivity;
};

export default function Activity({ activity }: ActivityProps) {
  return (
    <div className="flex flex-row gap-x-3 h-[120px] items-center border-b-2 border-slate-500">
      <div className="flex flex-col h-full bg-slate-200 py-3 font-bold text-center pl-8 pr-2">
        <div>{format(activity.scheduleStart, 'hh:mm aa')}</div>
        {activity.scheduleEnd && (
          <>
            <div>~</div>
            <div>{format(activity.scheduleEnd, 'hh:mm aa')}</div>
          </>
        )}
      </div>
      <div className="h-full py-3">
        <div className="font-bold text-lg">{activity.displayName}</div>
      </div>
      <div></div>
    </div>
  );
}
