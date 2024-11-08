import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polygon, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapController = ({ center, zoom, polygon }) => {
  const map = useMap();

  useEffect(() => {
    console.log('MapController update:', { center, zoom, hasPolygon: !!polygon });

    if (center) {
      map.setView(center, zoom);
    }

    if (polygon && polygon.length > 0) {
      try {
        const bounds = polygon.reduce((bounds, coord) => 
          bounds.extend([coord[0], coord[1]]), map.getBounds());
        map.fitBounds(bounds, { 
          padding: [50, 50],
          maxZoom: 13  // Limit max zoom after fitting bounds
        });
      } catch (err) {
        console.error('Error fitting bounds:', err);
      }
    }
  }, [map, center, zoom, polygon]);

  return null;
};

const CityMap = ({ cityname, region, osm_id }) => {
  const [mapData, setMapData] = useState({
    center: [-27.5954, -48.5480], // Default to Florianópolis
    polygon: null,
    zoom: 13  // Increased default zoom
  });
  const [loading, setLoading] = useState(false);

  // ESRI World Imagery tile URL
  const satelliteUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  const satelliteAttribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

  useEffect(() => {
    const fetchCityData = async () => {
      if (!cityname || !region) return;

      setLoading(true);
      try {
        const searchUrl = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityname)}&state=${region}&country=Brazil&format=json&polygon_geojson=1&addressdetails=1`;
        console.log('Fetching city data:', searchUrl);

        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data && data.length > 0) {
          const cityData = data[0];
          console.log('Found city data:', cityData);

          // Set new center
          const newCenter = [
            parseFloat(cityData.lat),
            parseFloat(cityData.lon)
          ];

          // Handle polygon data
          let polygonCoords = null;
          if (cityData.geojson) {
            if (cityData.geojson.type === 'Polygon') {
              polygonCoords = cityData.geojson.coordinates[0].map(coord => 
                [coord[1], coord[0]]
              );
            } else if (cityData.geojson.type === 'MultiPolygon') {
              // Get the largest polygon from MultiPolygon
              polygonCoords = cityData.geojson.coordinates[0][0].map(coord => 
                [coord[1], coord[0]]
              );
            }
          }

          setMapData({
            center: newCenter,
            polygon: polygonCoords,
            zoom: 13  // Higher zoom level
          });
        }
      } catch (err) {
        console.error('Error fetching city data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [cityname, region, osm_id]);

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
        minZoom={4}  // Prevent zooming out too far
        maxZoom={18} // Allow good satellite detail
      >
        {/* Satellite Base Layer */}
        <TileLayer
          url={satelliteUrl}
          attribution={satelliteAttribution}
        />

        <MapController 
          center={mapData.center}
          zoom={mapData.zoom}
          polygon={mapData.polygon}
        />

        {mapData.center && (
          <Marker position={mapData.center} />
        )}

        {mapData.polygon && (
          <Polygon
            positions={mapData.polygon}
            pathOptions={{
              color: "#2351DC",
              weight: 3, // Slightly thicker border for satellite view
              fillColor: "#2351DC",
              fillOpacity: 0.15, // Slightly higher opacity for satellite view
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default CityMap;