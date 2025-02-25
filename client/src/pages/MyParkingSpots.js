import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MyParkingSpots = () => {
  const { currentUser } = useAuth();
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    // This would normally fetch data from your API
    // For now, we'll use placeholder data
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockParkingSpots = [
        { 
          id: 1, 
          name: 'Home Driveway Spot', 
          location: '123 Main St, Hometown',
          description: 'Convenient driveway parking spot in a quiet neighborhood.',
          hourlyRate: '$5.00',
          dailyRate: '$25.00',
          status: 'active',
          availability: 'Weekdays 9 AM - 5 PM',
          image: 'https://via.placeholder.com/300x200',
          reservations: [
            { id: 101, date: '2023-04-15', time: '10:00 AM - 2:00 PM', renterName: 'Jane Doe' }
          ]
        },
        { 
          id: 2, 
          name: 'Office Parking', 
          location: '456 Business Ave, Downtown',
          description: 'Secure parking spot near downtown office buildings.',
          hourlyRate: '$8.00',
          dailyRate: '$40.00',
          status: 'active',
          availability: 'Weekends only',
          image: 'https://via.placeholder.com/300x200',
          reservations: []
        },
        { 
          id: 3, 
          name: 'Beach Parking Spot', 
          location: '789 Ocean Dr, Beachside',
          description: 'Prime parking spot just steps from the beach.',
          hourlyRate: '$10.00',
          dailyRate: '$50.00',
          status: 'inactive',
          availability: 'Anytime',
          image: 'https://via.placeholder.com/300x200',
          reservations: []
        }
      ];
      
      setParkingSpots(mockParkingSpots);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredParkingSpots = parkingSpots.filter(
    spot => spot.status === activeTab
  );

  const toggleSpotStatus = (id) => {
    // This would normally send a request to your API
    // For now, we'll just update the local state
    setParkingSpots(
      parkingSpots.map(spot => 
        spot.id === id 
          ? { ...spot, status: spot.status === 'active' ? 'inactive' : 'active' } 
          : spot
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Parking Spots</h1>
          <p className="text-gray-600">Manage your listed parking spots.</p>
        </div>
        <Link to="/add-parking-spot" className="btn btn-primary">
          Add New Spot
        </Link>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex space-x-8">
          <button
            className={`pb-4 font-medium ${activeTab === 'active' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button
            className={`pb-4 font-medium ${activeTab === 'inactive' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('inactive')}
          >
            Inactive
          </button>
        </div>
      </div>

      {/* Parking Spots List */}
      {loading ? (
        <div className="text-center py-8">
          <p>Loading your parking spots...</p>
        </div>
      ) : filteredParkingSpots.length > 0 ? (
        <div className="space-y-6">
          {filteredParkingSpots.map(spot => (
            <div key={spot.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={spot.image} 
                    alt={spot.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold mb-2">{spot.name}</h2>
                    <div className="flex space-x-2">
                      <Link 
                        to={`/edit-parking-spot/${spot.id}`} 
                        className="text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => toggleSpotStatus(spot.id)}
                        className="text-gray-500 hover:underline"
                      >
                        {spot.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-2">{spot.location}</p>
                  <p className="text-gray-700 mb-4">{spot.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600">Hourly Rate</p>
                      <p className="text-primary font-medium">{spot.hourlyRate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Daily Rate</p>
                      <p className="text-primary font-medium">{spot.dailyRate}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-600">Availability</p>
                    <p className="font-medium">{spot.availability}</p>
                  </div>
                  
                  {/* Upcoming Reservations */}
                  <div>
                    <h3 className="font-medium mb-2">Upcoming Reservations</h3>
                    {spot.reservations.length > 0 ? (
                      <div className="space-y-2">
                        {spot.reservations.map(reservation => (
                          <div key={reservation.id} className="bg-gray-50 p-3 rounded">
                            <p className="font-medium">{reservation.date}</p>
                            <p className="text-gray-600">{reservation.time} • {reservation.renterName}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No upcoming reservations</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 mb-4">You don't have any {activeTab} parking spots.</p>
          {activeTab !== 'active' && (
            <button
              onClick={() => setActiveTab('active')}
              className="text-primary hover:underline"
            >
              View active spots
            </button>
          )}
          {activeTab === 'active' && (
            <Link to="/add-parking-spot" className="btn btn-primary">
              Add New Spot
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default MyParkingSpots; 