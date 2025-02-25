import React, { useState } from 'react';
import Map from '../components/Map';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();
  const [searchLocation, setSearchLocation] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Winter Parking in North York</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Reserve private parking spots in your neighborhood and avoid the hassle of snow-covered streets.
        </p>
        
        {!currentUser && (
          <div className="mt-6 flex justify-center gap-4">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-outline">Log In</Link>
          </div>
        )}
      </section>

      <section className="mb-12">
        <div className="max-w-xl mx-auto mb-8">
          <div className="flex">
            <input
              type="text"
              placeholder="Search by address or postal code"
              className="input flex-grow"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <button className="btn btn-primary ml-2">Search</button>
          </div>
        </div>
        
        <Map />
        
        <div className="text-center mt-4">
          <Link to="/add-parking-spot" className="btn btn-primary">
            List Your Parking Spot
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl text-primary mb-4">🚗</div>
          <h3 className="text-xl font-semibold mb-2">Find Nearby Spots</h3>
          <p className="text-gray-600">
            Discover available parking spots in your neighborhood, with real-time availability.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl text-primary mb-4">📅</div>
          <h3 className="text-xl font-semibold mb-2">Easy Reservations</h3>
          <p className="text-gray-600">
            Book parking spots in advance and secure your space during winter months.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl text-primary mb-4">💰</div>
          <h3 className="text-xl font-semibold mb-2">Earn Money</h3>
          <p className="text-gray-600">
            List your unused parking space and earn extra income during winter.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home; 