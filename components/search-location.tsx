import { useMapTools } from '@/src/hooks/maps/use-map-tools';
import { usePlacesService } from '@/src/hooks/maps/use-places-service';
import { debounce } from 'lodash-es';
import { useEffect, useState } from 'react';
import { Button, ScrollView, TextInput } from 'react-native';

export function SearchLocation({ center, bounds }: { center?: google.maps.LatLng; bounds?: google.maps.LatLngBounds }) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [placesResult, setPlacesResult] = useState<google.maps.places.PlaceResult[]>();
  const placesService = usePlacesService();

  const searchCallback = debounce((term: string) => setSearchTerm(term), 1000);

  const { goTo } = useMapTools();

  useEffect(() => {
    if (placesService != null) {
      placesService.textSearch({ query: searchTerm, location: center, bounds }, (result) => {
        setPlacesResult(result ?? []);
      });
    }
  }, [searchTerm, placesService, center, bounds]);

  useEffect(() => {
    return () => {
      searchCallback.cancel(); // Cancel any pending debounced calls
    };
  }, [searchCallback]);

  return (
    <>
      <div className="grid grid-cols-[minmax(0,1fr)_60px]">
        <TextInput className="border-2 border-slate-600 rounded text-lg" onChangeText={searchCallback}></TextInput>
        <Button
          title="Clear"
          onPress={() => {
            setSearchTerm('');
            setPlacesResult([]);
          }}
        ></Button>
      </div>
      <ScrollView className="max-h-[250px]">
        {placesResult?.map((place, index) => (
          <div key={`place_${index}`} className="flex justify-between py-2">
            <span>{place.name}</span>
            <div className="flex gap-[1em] h-fit">
              <Button
                title="Goto"
                onPress={() => {
                  goTo(place.geometry);
                }}
              ></Button>
              <Button
                title="Copy"
                onPress={() => {
                  navigator.clipboard.writeText(JSON.stringify(place));
                }}
              ></Button>
            </div>
          </div>
        ))}
      </ScrollView>
    </>
  );
}
