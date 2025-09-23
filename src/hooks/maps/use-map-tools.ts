import { useMap } from '@vis.gl/react-google-maps';

export function useMapTools() {
  const map = useMap();

  function goTo(geo: google.maps.places.PlaceGeometry | null | undefined) {
    if (geo) {
      const { location, viewport } = geo;

      if (map) {
        if (location) map.panTo(location);
        if (viewport) map.fitBounds(viewport);
      }
    }
  }

  return { goTo };
}
