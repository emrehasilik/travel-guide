import React, { useEffect, useState } from 'react';
import useCityStore from '../store/cityStore';
import CreateCity from '../components/CreateCity';

const CityList = () => {
  const { cities, fetchCities, deleteCity } = useCityStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Şehir Listesi</h2>
      <button
        onClick={handleOpenPopup}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Şehir Ekle
      </button>
      <ul className="list-none p-0">
        {cities.map((city) => (
          <li key={city.SehirID} className="flex justify-between items-center p-2 mb-2 bg-white border border-gray-300 rounded">
            {city.SehirAdi}
            <button className="bg-red-500 text-white p-2 rounded" onClick={() => deleteCity(city.SehirID)}>
              Sil
            </button>
          </li>
        ))}
      </ul>
      {isPopupOpen && <CreateCity onClose={handleClosePopup} />}
    </div>
  );
};

export default CityList;
