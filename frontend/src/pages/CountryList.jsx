import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa"; // İkonlar için ekleme
import useCountryStore from "../store/countryStore";
import CreateCountry from "../components/CreateCountry";

const CountryList = () => {
  const { countries, fetchCountries, removeCountry } = useCountryStore();
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Ülke Listesi</h2>
      <button
        onClick={handleOpenPopup}
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition mb-4 mx-auto"
      >
        <FaPlus /> Ülke Ekle
      </button>
      <ul className="list-none p-0 space-y-3">
        {countries.map((country) => (
          <li
            key={country.UlkeID}
            className="flex justify-between items-center p-4 bg-gray-50 border rounded-md shadow-sm hover:shadow-md transition"
          >
            <span className="font-medium text-gray-700">{country.UlkeAdi}</span>
            <button
              className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
              onClick={() => removeCountry(country.UlkeID)}
            >
              <FaTrash /> Sil
            </button>
          </li>
        ))}
      </ul>
      {isPopupOpen && <CreateCountry onClose={handleClosePopup} />}
    </div>
  );
};

export default CountryList;
