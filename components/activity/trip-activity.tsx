import { IActivity } from '@/core/interfaces/IActivity';
import { format } from 'date-fns';

export type ActivityProps = {
  activity: IActivity;
};

export default function Activity({ activity }: ActivityProps) {
  return (
    <div>
      <div>
        <div>{format(activity.scheduleStart, 'hh:mm aa')}</div>
        {activity.scheduleEnd && (
          <>
            <div>~</div>
            <div>{activity.scheduleEnd}</div>
          </>
        )}
      </div>
      <div>{activity.displayName}</div>
      <div></div>
    </div>
  );
}
