import { Map } from '@vis.gl/react-google-maps';

export function WebMap() {
  return (
    <Map className="h-full w-full" defaultCenter={{ lat: 22.54992, lng: 0 }} defaultZoom={3} gestureHandling="greedy" disableDefaultUI />
  );
}
