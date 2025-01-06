import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

// Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapController = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom]);

  return null;
};

const CityMap = ({ cityname, region }) => {
  const [mapData, setMapData] = useState({
    center: [-27.5954, -48.5480], // Default to Florianópolis
    zoom: 12
  });
  const [loading, setLoading] = useState(false);

  // ESRI World Imagery
  const satelliteUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  const satelliteAttribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

  useEffect(() => {
    const fetchCityData = async () => {
      if (!cityname || !region) return;

      setLoading(true);
      try {
        const searchUrl = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityname)}&state=${region}&country=Brazil&format=json`;
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data && data.length > 0) {
          const cityData = data[0];
          setMapData({
            center: [parseFloat(cityData.lat), parseFloat(cityData.lon)],
            zoom: 12
          });
        }
      } catch (err) {
        console.error('Error fetching city data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [cityname, region]);

  return (
    <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 z-10 flex items-center justify-center">
          <p className="text-gray-600">Loading map for {cityname}...</p>
        </div>
      )}

      <MapContainer
        center={mapData.center}
        zoom={mapData.zoom}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
        minZoom={4}
        maxZoom={18}
      >
        <TileLayer
          url={satelliteUrl}
          attribution={satelliteAttribution}
        />

        <MapController 
          center={mapData.center}
          zoom={mapData.zoom}
        />

        {mapData.center && (
          <Marker position={mapData.center} icon={customIcon} />
        )}
      </MapContainer>
    </div>
  );
};

export default CityMap;