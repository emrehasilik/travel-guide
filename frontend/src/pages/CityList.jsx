import React, { useEffect, useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
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

  const handleAddCity = (newCity) => {
    useCityStore.getState().addCity(
      newCity.SehirAdi,
      newCity.UlkeID,
      newCity.SehirKodu,
      newCity.Nufus,
      newCity.Aciklama
    );
    handleClosePopup();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Şehir Listesi</h2>
      <button
        onClick={handleOpenPopup}
        className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        <FaPlus /> Şehir Ekle
      </button>
      <ul className="list-none p-0 mt-4 space-y-2">
        {cities.map((city) => (
          <li
            key={city.SehirID}
            className="flex justify-between items-center p-4 bg-gray-50 border rounded-md shadow-sm hover:shadow-md transition"
          >
            <span className="font-medium text-gray-700">{city.SehirAdi}</span>
            <button
              className="flex items-center justify-center bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
              onClick={() => deleteCity(city.SehirID)}
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      {isPopupOpen && (
        <CreateCity onClose={handleClosePopup} onAddCity={handleAddCity} />
      )}
    </div>
  );
};

export default CityList;
