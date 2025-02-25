import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [recentReservations, setRecentReservations] = useState([]);
  const [recentParkingSpots, setRecentParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would normally fetch data from your API
    // For now, we'll use placeholder data
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setRecentReservations([
        { id: 1, spotName: 'Downtown Parking Spot', date: '2023-03-15', time: '10:00 AM - 2:00 PM', price: '$15.00' },
        { id: 2, spotName: 'Beach Parking', date: '2023-03-20', time: '9:00 AM - 5:00 PM', price: '$25.00' }
      ]);
      
      setRecentParkingSpots([
        { id: 1, name: 'Home Driveway Spot', location: '123 Main St', hourlyRate: '$5.00', status: 'Available' },
        { id: 2, name: 'Office Parking', location: '456 Business Ave', hourlyRate: '$8.00', status: 'Booked' }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {currentUser?.displayName || 'User'}!</h1>
        <p className="text-gray-600">Manage your parking spots and reservations from your dashboard.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Reservations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Reservations</h2>
            <Link to="/my-reservations" className="text-primary hover:underline">View All</Link>
          </div>
          
          {loading ? (
            <p>Loading reservations...</p>
          ) : recentReservations.length > 0 ? (
            <div className="space-y-4">
              {recentReservations.map(reservation => (
                <div key={reservation.id} className="border-b pb-4">
                  <h3 className="font-medium">{reservation.spotName}</h3>
                  <p className="text-sm text-gray-600">{reservation.date} • {reservation.time}</p>
                  <p className="text-primary font-medium">{reservation.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You have no recent reservations.</p>
          )}
          
          <div className="mt-4">
            <Link to="/" className="btn btn-primary w-full">Find Parking</Link>
          </div>
        </div>

        {/* My Parking Spots */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Parking Spots</h2>
            <Link to="/my-parking-spots" className="text-primary hover:underline">View All</Link>
          </div>
          
          {loading ? (
            <p>Loading parking spots...</p>
          ) : recentParkingSpots.length > 0 ? (
            <div className="space-y-4">
              {recentParkingSpots.map(spot => (
                <div key={spot.id} className="border-b pb-4">
                  <h3 className="font-medium">{spot.name}</h3>
                  <p className="text-sm text-gray-600">{spot.location}</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-primary font-medium">{spot.hourlyRate}/hour</span>
                    <span className={`text-sm ${spot.status === 'Available' ? 'text-green-500' : 'text-orange-500'}`}>
                      {spot.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You haven't listed any parking spots yet.</p>
          )}
          
          <div className="mt-4">
            <Link to="/add-parking-spot" className="btn btn-primary w-full">Add New Spot</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 