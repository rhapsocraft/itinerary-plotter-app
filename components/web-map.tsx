import { Map } from '@vis.gl/react-google-maps';
import { SearchLocation } from './search-location';

export function WebMap({ center, bounds }: { center?: google.maps.LatLng; bounds?: google.maps.LatLngBounds }) {
  return (
    <div className="h-full relative w-full overflow-hidden">
      <Map defaultCenter={{ lat: 22.54992, lng: 0 }} defaultZoom={3} gestureHandling="greedy" disableDefaultUI />
      <div className="flex flex-col justify-center absolute w-full h-full pointer-events-none top-0">
        {/* Debug only */}
        <div className="pointer-events-auto relative mx-auto mb-auto mt-4 w-[385px]">
          <div className="flex flex-col absolute bg-slate-50 flex flex-col p-2 rounded-lg w-full shadow-md mx-auto">
            <SearchLocation center={center} bounds={bounds}></SearchLocation>
          </div>
        </div>
        <div className="pointer-events-auto h-full h-[340px] min-w-[385px] max-w-[640px] mx-auto mt-auto mb-4 w-full bg-white rounded-xl shadow-md"></div>
      </div>
    </div>
  );
}
