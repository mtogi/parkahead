import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ParkingSpotDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');

  useEffect(() => {
    const fetchSpotDetails = async () => {
      try {
        // TODO: Implement API call to fetch parking spot details
        // For now, using mock data
        setSpot({
          id,
          address: '123 Main St',
          description: 'Convenient parking spot in downtown',
          hourlyRate: 5.00,
          availability: {
            startTime: '08:00',
            endTime: '20:00'
          },
          owner: {
            name: 'John Doe',
            rating: 4.5
          }
        });
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch parking spot details');
        setLoading(false);
      }
    };

    fetchSpotDetails();
  }, [id]);

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement reservation API call
      navigate('/my-reservations');
    } catch (error) {
      setError('Failed to make reservation');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{spot.address}</h1>
            <div className="mb-6">
              <p className="text-gray-600">{spot.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <ul className="space-y-2">
                  <li>
                    <span className="font-medium">Rate:</span> ${spot.hourlyRate}/hour
                  </li>
                  <li>
                    <span className="font-medium">Available Hours:</span>{' '}
                    {spot.availability.startTime} - {spot.availability.endTime}
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Owner Information</h2>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{spot.owner.name}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{spot.owner.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {currentUser && (
              <form onSubmit={handleReservation} className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Make a Reservation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={reservationDate}
                      onChange={(e) => setReservationDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={reservationTime}
                      onChange={(e) => setReservationTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Reserve Now
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingSpotDetails; 