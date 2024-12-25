import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/Layout';
import CountryList from './pages/CountryList';
import CityList from './pages/CityList';
import RehberList from './pages/RehberList';
import HotelList from './pages/HotelList';
import PassengerList from './pages/PassengerList';
import TourList from './pages/TourList';
import CreateTour from './pages/CreateTour';
import Login from './pages/login';
import './index.css'; // Tailwind CSS'i dahil edin

const App = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <Routes>
        {/* Ana rota: Giriş yapıldıysa /countryList'e yönlendirilir, yapılmadıysa /login'e */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/countryList" /> : <Navigate to="/login" />
          }
        />

        {/* Login Sayfası */}
        <Route path="/login" element={<Login />} />

        {/* Authenticated Kullanıcılar için Rotalar */}
        {isAuthenticated && (
          <Route path="/" element={<AdminLayout />}>
            <Route path="countryList" element={<CountryList />} />
            <Route path="cityList" element={<CityList />} />
            <Route path="rehberList" element={<RehberList />} />
            <Route path="hotelList" element={<HotelList />} />
            <Route path="passengerList" element={<PassengerList />} />
            <Route path="tourList" element={<TourList />} />
            <Route path="createTour" element={<CreateTour />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default App;
