import React, { useEffect, useState } from 'react';
import useCountryStore from '../store/countryStore';
import CreateCountry from '../components/CreateCountry';

const CountryList = () => {
  const { countries, fetchCountries, deleteCountry } = useCountryStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Ülke Listesi</h2>
      <button
        onClick={handleOpenPopup}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Ülke Ekle
      </button>
      <ul className="list-none p-0">
        {countries.map((country) => (
          <li
            key={country.UlkeID}
            className="flex justify-between items-center p-2 mb-2 bg-white border border-gray-300 rounded"
          >
            {country.UlkeAdi}
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => deleteCountry(country.UlkeID)}
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
      {isPopupOpen && <CreateCountry onClose={handleClosePopup} />}
    </div>
  );
};

export default CountryList;



