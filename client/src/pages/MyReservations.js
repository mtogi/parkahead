import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MyReservations = () => {
  const { currentUser } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    // This would normally fetch data from your API
    // For now, we'll use placeholder data
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockReservations = [
        { 
          id: 1, 
          spotName: 'Downtown Parking Spot', 
          location: '123 Main St, Downtown',
          date: '2023-04-15', 
          time: '10:00 AM - 2:00 PM', 
          price: '$15.00',
          status: 'upcoming',
          ownerName: 'John Smith',
          ownerPhone: '555-123-4567'
        },
        { 
          id: 2, 
          spotName: 'Beach Parking', 
          location: '789 Ocean Ave, Beachside',
          date: '2023-04-20', 
          time: '9:00 AM - 5:00 PM', 
          price: '$25.00',
          status: 'upcoming',
          ownerName: 'Sarah Johnson',
          ownerPhone: '555-987-6543'
        },
        { 
          id: 3, 
          spotName: 'Stadium Parking', 
          location: '456 Sports Blvd, Stadium District',
          date: '2023-03-10', 
          time: '6:00 PM - 10:00 PM', 
          price: '$20.00',
          status: 'past',
          ownerName: 'Mike Wilson',
          ownerPhone: '555-456-7890'
        },
        { 
          id: 4, 
          spotName: 'Shopping Mall Parking', 
          location: '222 Retail Road, Shopping District',
          date: '2023-03-05', 
          time: '1:00 PM - 6:00 PM', 
          price: '$18.00',
          status: 'past',
          ownerName: 'Lisa Brown',
          ownerPhone: '555-234-5678'
        }
      ];
      
      setReservations(mockReservations);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredReservations = reservations.filter(
    reservation => reservation.status === activeTab
  );

  const handleCancelReservation = (id) => {
    // This would normally send a request to your API
    // For now, we'll just update the local state
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      setReservations(
        reservations.map(reservation => 
          reservation.id === id 
            ? { ...reservation, status: 'cancelled' } 
            : reservation
        )
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Reservations</h1>
        <p className="text-gray-600">View and manage your parking reservations.</p>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex space-x-8">
          <button
            className={`pb-4 font-medium ${activeTab === 'upcoming' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`pb-4 font-medium ${activeTab === 'past' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('past')}
          >
            Past
          </button>
          <button
            className={`pb-4 font-medium ${activeTab === 'cancelled' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Reservations List */}
      {loading ? (
        <div className="text-center py-8">
          <p>Loading your reservations...</p>
        </div>
      ) : filteredReservations.length > 0 ? (
        <div className="space-y-6">
          {filteredReservations.map(reservation => (
            <div key={reservation.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="md:flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{reservation.spotName}</h2>
                  <p className="text-gray-600 mb-1">{reservation.location}</p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Date:</span> {reservation.date}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Time:</span> {reservation.time}
                  </p>
                  <p className="text-gray-600 mb-3">
                    <span className="font-medium">Price:</span> {reservation.price}
                  </p>
                  
                  <div className="mb-4">
                    <h3 className="font-medium mb-1">Owner Contact:</h3>
                    <p className="text-gray-600">{reservation.ownerName} • {reservation.ownerPhone}</p>
                  </div>
                </div>
                
                {activeTab === 'upcoming' && (
                  <div className="md:text-right mt-4 md:mt-0">
                    <button
                      onClick={() => handleCancelReservation(reservation.id)}
                      className="btn btn-outline-danger"
                    >
                      Cancel Reservation
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 mb-4">You don't have any {activeTab} reservations.</p>
          {activeTab !== 'upcoming' && (
            <button
              onClick={() => setActiveTab('upcoming')}
              className="text-primary hover:underline"
            >
              View upcoming reservations
            </button>
          )}
          {activeTab === 'upcoming' && (
            <Link to="/" className="btn btn-primary">
              Find Parking
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default MyReservations; 