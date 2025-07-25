// hooks/useMapClickHandler.ts
import { useMapEvents } from 'react-leaflet';
import { type LatLngTuple } from 'leaflet';

// interface UseMapClickHandlerProps {
//   onMapClick: (coords: LatLngTuple) => void;
// }

export function useMapClickHandler(onMapClick: (coords: LatLngTuple) => void) {
  useMapEvents({
    click: (e) => {
      const newPos: LatLngTuple = [e.latlng.lat, e.latlng.lng];
      onMapClick(newPos);
    },
  });
}