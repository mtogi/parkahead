import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddParkingSpot from './pages/AddParkingSpot';
import ParkingSpotDetails from './pages/ParkingSpotDetails';
import MyReservations from './pages/MyReservations';
import MyParkingSpots from './pages/MyParkingSpots';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/add-parking-spot" element={
                <PrivateRoute>
                  <AddParkingSpot />
                </PrivateRoute>
              } />
              <Route path="/parking-spot/:id" element={<ParkingSpotDetails />} />
              <Route path="/my-reservations" element={
                <PrivateRoute>
                  <MyReservations />
                </PrivateRoute>
              } />
              <Route path="/my-parking-spots" element={
                <PrivateRoute>
                  <MyParkingSpots />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
