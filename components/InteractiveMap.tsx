import React from 'react';
import { Place, Event, Trail, LiveEvent } from '../types';
import Icon from './Icon';

type MapItem = (Place | Event | Trail | LiveEvent) & { coordinates?: { lat: number; lng: number } };

interface InteractiveMapProps {
  items: MapItem[];
  selectedItemId?: string | null;
  onMarkerClick: (id: string | null) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ items, selectedItemId, onMarkerClick }) => {
  // This is a static placeholder for an interactive map.
  // A real implementation would use a library like Mapbox GL JS or Leaflet.
  
  const centerLat = 45.899;
  const centerLng = 6.129;
  const zoom = 13;

  const mapImageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-star+285A98(${centerLng},${centerLat})/${centerLng},${centerLat},${zoom},0/800x600?access_token=pk.eyJ1IjoiZmFicmljOCIsImEiOiJjaWc5aTd2ZzUwMDk1bHNrdDR2d3p3bmVoIn0.p-b4-dlBS_G87-O3T5M0gQ`

  return (
    <div className="w-full h-full bg-gray-300 rounded-2xl overflow-hidden relative shadow-inner">
      <img src={mapImageUrl} alt="Carte d'Annecy" className="w-full h-full object-cover" />
       <div className="absolute inset-0 flex items-center justify-center">
         <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-lg">
           <h3 className="font-bold">Carte Interactive</h3>
           <p className="text-sm">Ceci est une image statique.</p>
           <p className="text-xs text-gray-500">Une carte interactive sera bientôt disponible.</p>
         </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
