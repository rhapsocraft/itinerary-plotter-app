import { usePlacesService } from '@/hooks/maps/use-places-service';
import { debounce } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native';

export function SearchLocation() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [placesResult, setPlacesResult] = useState<google.maps.places.PlaceResult[]>();
  const placesService = usePlacesService();

  const searchCallback = useCallback(
    debounce((term: string) => setSearchTerm(term), 1000),
    [searchTerm],
  );

  useEffect(() => {
    if (placesService != null) {
      placesService.findPlaceFromQuery({ query: searchTerm, fields: ['name', 'place_id'] }, (result) => {
        console.log('places: ', result);
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
            <Button title="Goto" onPress={() => {}}></Button>
          </div>
        ))}
      </div>
    </div>
  );
}
