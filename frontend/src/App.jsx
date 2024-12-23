import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/Layout';
import CountryList from './pages/CountryList';
import CityList from './pages/CityList';
import RehberList from './pages/RehberList';
import PlaneList from './pages/PlaneList';
import HotelList from './pages/HotelList';
import PassengerList from './pages/PassengerList';
import TourList from './pages/TourList';
import './index.css'; // Tailwind CSS'i dahil edin
import RouteList from './pages/RouteList';
import CreateTour from './pages/CreateTour';

const App = () => {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route path="countryList" element={<CountryList />} />
            <Route path="/cityList" element={<CityList />} />
            <Route path="/rehberList" element={<RehberList />} />
            <Route path="/planeList" element={<PlaneList />} />
            <Route path="/hotelList" element={<HotelList />} />
            <Route path="/passengerList" element={<PassengerList />} />
            <Route path="/tourList" element={<TourList />} />
            <Route path="/routeList" element={<RouteList />} />
            <Route path="/createTour" element={<CreateTour />} />
          </Route>
        </Routes>
      </Router>
    
  );
};

export default App;
