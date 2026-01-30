import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import type { LeafletMouseEvent, LatLngExpression } from 'leaflet';
import { MapPin } from 'lucide-react';

// Fix for default marker icon in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapSelectorProps {
    onLocationSelect: (lat: number, lng: number) => void;
}

const MapSelector = ({ onLocationSelect }: MapSelectorProps) => {
    const [position, setPosition] = useState<[number, number] | null>(null);

    const LocationMarker = () => {
        useMapEvents({
            click(e: LeafletMouseEvent) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                onLocationSelect(e.latlng.lat, e.latlng.lng);
            },
        });

        return position === null ? null : (
            <Marker position={position as LatLngExpression}></Marker>
        );
    };

    return (
        <div className="relative">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] glass-card px-4 py-2 flex items-center gap-2 pointer-events-none">
                <MapPin size={16} className="text-[#2d5a27]" />
                <span className="text-xs font-semibold whitespace-nowrap">Click on map to set location</span>
            </div>
            <MapContainer
                center={[20.5937, 78.9629] as LatLngExpression}
                zoom={5}
                scrollWheelZoom={false}
                className="h-[400px] w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </div>
    );
};

export default MapSelector;
