import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/Layout';
import CountryList from './pages/CountryList';
import CityList from './pages/CityList';
import RehberList from './pages/RehberList';
import Airplane from './pages/Airplane';
import Hotel from './pages/HotelList';
import Passenger from './pages/PassengerList';
import TourList from './pages/TourList';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route path="countryList" element={<CountryList />} />
          <Route path="/cityList" element={<CityList />} />
          <Route path="/rehberList" element={<RehberList />} />
          <Route path="/airplaneList" element={<Airplane />} />
          <Route path="/hotelList" element={<Hotel />} />
          <Route path="/passengerList" element={<Passenger />} />
          <Route path="/tourList" element={<TourList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
