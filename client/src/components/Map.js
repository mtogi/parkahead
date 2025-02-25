import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { parkingSpotService } from '../services/api';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Map = ({ center = [43.7731, -79.4141], zoom = 13 }) => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        const response = await parkingSpotService.getNearby(center[1], center[0], 5000);
        setParkingSpots(response.data);
      } catch (err) {
        console.error('Error fetching parking spots:', err);
        setError('Failed to load parking spots');
      } finally {
        setLoading(false);
      }
    };

    fetchParkingSpots();
  }, [center]);

  if (loading) return <div className="flex justify-center p-4">Loading map...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {parkingSpots.map(spot => (
          <Marker 
            key={spot._id} 
            position={[spot.location.coordinates[1], spot.location.coordinates[0]]}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">{spot.location.address}</h3>
                <p className="text-green-600 font-semibold">${spot.price}/day</p>
                <Link 
                  to={`/parking-spot/${spot._id}`}
                  className="block mt-2 text-sm bg-primary text-white py-1 px-2 rounded hover:bg-secondary"
                >
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map; 