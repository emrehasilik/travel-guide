import React, { useState } from 'react';
import CreateCountry from '../components/CreateCountry';

const CountryList = () => {
    const [countries, setCountries] = useState([
        { UlkeID: 1, UlkeAdi: 'Türkiye', cities: ['İstanbul', 'Ankara', 'İzmir'] },
        { UlkeID: 2, UlkeAdi: 'ABD', cities: ['New York', 'Los Angeles'] },
        { UlkeID: 3, UlkeAdi: 'Almanya', cities: ['Berlin', 'Münih'] },
    ]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Popup aç/kapat
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const [selectedCountryId, setSelectedCountryId] = useState(null); // Seçilen ülkeyi takip eder

    const handleCountryClick = (countryId) => {
        setSelectedCountryId(selectedCountryId === countryId ? null : countryId); // Toggle
    };

    // Yeni ülke kaydet
    const handleSaveCountry = (newCountry) => {
        setCountries([
            ...countries,
            { UlkeID: countries.length + 1, ...newCountry },
        ]);
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Ülke Listesi</h2>
                <button
                    onClick={togglePopup}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    + Ülke Ekle
                </button>
            </div>

            {/* Ülke Listesi */}
            <ul className="space-y-2">
                {countries.map((country) => (
                    <li
                        key={country.UlkeID}
                        className="p-4 border rounded hover:bg-gray-100"
                    >
                        {/* Ülke Adı ve Sil Butonu */}
                        <div
                            className="cursor-pointer flex justify-between items-center"
                            onClick={() => handleCountryClick(country.UlkeID)}
                        >
                            <span>{country.UlkeAdi}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Tıklama olayını engelle
                                    setCountries(
                                        countries.filter((item) => item.UlkeID !== country.UlkeID)
                                    );
                                }}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Sil
                            </button>
                        </div>

                        {/* Şehir Listesi */}
                        {selectedCountryId === country.UlkeID && (
                            <ul className="mt-2 pl-4 list-disc">
                                {country.cities.map((city, index) => (
                                    <li key={index} className="text-gray-600">
                                        {city}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>



            {/* CreateCountry Popup */}
            {isPopupOpen && (
                <CreateCountry onClose={togglePopup} onSave={handleSaveCountry} />
            )}
        </div>
    );
};

export default CountryList;
