import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L, { type LatLngTuple } from "leaflet";
import { Button } from "./ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from "./ui/dialog";

import "leaflet/dist/leaflet.css";
import { useTranslation } from "react-i18next";

// Leaflet по умолчанию ищет иконки по определенным путям,
// и иногда их нужно явно указать или импортировать.
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
   iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface MapModalProps {
   isOpen: boolean;
   onClose: () => void;
   onLocationSelect: (address: string, lat: number, lng: number) => void;
}

const OpenStreetMapModal: React.FC<MapModalProps> = ({
   isOpen,
   onClose,
   onLocationSelect,
}) => {
    
   const { i18n } = useTranslation();
   const [ language, _setLanguage ] = useState(i18n.language);

   const baseUrl = import.meta.env.VITE_NOMINATIM_REVERSE_API_URL;
   const [currentPosition, setCurrentPosition] = useState<LatLngTuple | null>(
      null
   );
   const [markerPosition, setMarkerPosition] = useState<LatLngTuple | null>(
      null
   );
   const [selectedAddress, setSelectedAddress] = useState<string>("");

   const defaultCenter: [number, number] = [37.939277, 58.381487];

   const { t } = useTranslation();
   // Хук для обработки событий карты (например, кликов)
   function MapEventsHandler() {
      useMapEvents({
         click: (e) => {
            const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
            setMarkerPosition(newPos);
            geocodeLatLng(newPos); // Получаем адрес по новым координатам
         },
      });
      return null;
   }

   // Получение текущего местоположения пользователя
   useEffect(() => {
      if (!isOpen) return; // Не получаем геолокацию, если модалка закрыта
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               const pos: [number, number] = [
                  position.coords.latitude,
                  position.coords.longitude,
               ];
               setCurrentPosition(pos);
               setMarkerPosition(pos);
               geocodeLatLng(pos);
            },
            (error) => {
               console.error("Error of location getting", error);
               setCurrentPosition(defaultCenter);
               setMarkerPosition(defaultCenter);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
         );
      } else {
         console.log("Your browser doesn't support geolocation");
         setCurrentPosition(defaultCenter);
         setMarkerPosition(defaultCenter);
      }
   }, [isOpen]); // Запускаем при открытии модалки

   // Функция для геокодирования (получения адреса по координатам)
   // Используем Nominatim - OpenStreetMap Geocoding API
   const geocodeLatLng = useCallback(async (coords: LatLngTuple) => {
      const [lat, lng] = coords;
      try {
         const response = await fetch(`${baseUrl}&lat=${lat}&lon=${lng}&accept-language=${language}`);
         const data = await response.json();
         if (data && data.display_name) {
            setSelectedAddress(data.display_name);
         } else {
            setSelectedAddress(
               `${t('coordinates')}: ${lat.toFixed(6)}, ${lng.toFixed(6)}`
            );
         }
      } catch (error) {
         console.error("Error of geocoding Nominatim:", error);
         setSelectedAddress(`${t('coordinates')}: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      }
   }, []);

   // Обработчик выбора местоположения
   const handleSelectLocation = () => {
      if (markerPosition && selectedAddress) {
         onLocationSelect(
            selectedAddress,
            markerPosition[0],
            markerPosition[1]
         );
         onClose();
      }
   };

   // Рендер только если модалка открыта и есть хотя бы дефолтные координаты
   if (!isOpen || !currentPosition) {
      return null;
   }

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="sm:max-w-[800px] w-11/12 md:w-[70%]">
            <DialogHeader>
               <DialogTitle>{t("mapTitle")}</DialogTitle>
               <DialogDescription>{t("mapDescription")}</DialogDescription>
            </DialogHeader>

            <div className="w-full h-[400px]">
               <MapContainer
                  center={currentPosition}
                  zoom={15}
                  scrollWheelZoom={true}
                  className="w-full h-full"
               >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {markerPosition && (
                     <Marker
                        position={markerPosition}
                        draggable={true}
                        eventHandlers={{
                           dragend: (e) => {
                              const newPos: [number, number] = [
                                 e.target.getLatLng().lat,
                                 e.target.getLatLng().lng,
                              ];
                              setMarkerPosition(newPos);
                              geocodeLatLng(newPos);
                           },
                        }}
                     />
                  )}
                  <MapEventsHandler /> {/* Для обработки кликов по карте */}
               </MapContainer>
            </div>

            <div className="mt-4">
               <p className="font-semibold">{t("selectedAdress")}</p>
               <p>{selectedAddress || t("selectAdress")}</p>
            </div>
            <Button
               onClick={handleSelectLocation}
               disabled={!markerPosition || !selectedAddress}
            >
               {t("selectThisAdress")}
            </Button>
         </DialogContent>
      </Dialog>
   );
};

export default OpenStreetMapModal;
