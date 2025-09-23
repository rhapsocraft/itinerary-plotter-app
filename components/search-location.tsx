import { usePlacesService } from '@/src/hooks/maps/use-places-service';
import { useMap } from '@vis.gl/react-google-maps';
import { debounce } from 'lodash-es';
import { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native';

export function SearchLocation() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [placesResult, setPlacesResult] = useState<google.maps.places.PlaceResult[]>();
  const placesService = usePlacesService();

  const searchCallback = debounce((term: string) => setSearchTerm(term), 1000);

  const map = useMap();

  useEffect(() => {
    if (placesService != null) {
      placesService.findPlaceFromQuery({ query: searchTerm, fields: ['name', 'place_id', 'geometry'] }, (result) => {
        setPlacesResult(result ?? []);
      });
    }
  }, [searchTerm, placesService]);

  useEffect(() => {
    return () => {
      searchCallback.cancel(); // Cancel any pending debounced calls
    };
  }, [searchCallback]);

  return (
    <div>
      <TextInput className="border-2 border-slate-600 rounded text-lg" onChangeText={searchCallback}></TextInput>
      <div>
        {placesResult?.map((place, index) => (
          <div key={`place_${index}`} className="flex">
            {place.name}
            <Button
              title="Goto"
              onPress={() => {
                const location = place.geometry?.location;
                if (map && location) {
                  map?.setCenter(location);
                  const viewport = place.geometry?.viewport;

                  if (viewport) {
                    map.fitBounds(viewport);
                  }
                }

                console.log(place, JSON.stringify(place));
              }}
            ></Button>
          </div>
        ))}
      </div>
    </div>
  );
}
