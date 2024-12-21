import React, { useState } from 'react';
import CreateCity from '../components/CreateCity';

const CityList = () => {
  const [cities, setCities] = useState([
    { SehirID: 1, SehirAdi: 'İstanbul', UlkeAdi: 'Türkiye', SehirKodu: 'IST', Nufus: 15029231 },
    { SehirID: 2, SehirAdi: 'Ankara', UlkeAdi: 'Türkiye', SehirKodu: 'ANK', Nufus: 5663322 },
    { SehirID: 3, SehirAdi: 'Berlin', UlkeAdi: 'Almanya', SehirKodu: 'BER', Nufus: 3769000 },
    { SehirID: 4, SehirAdi: 'New York', UlkeAdi: 'ABD', SehirKodu: 'NYC', Nufus: 8419600 },
  ]);

  const [countries] = useState(['Türkiye', 'Almanya', 'ABD']); // Mevcut ülkeler
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Şehir Silme Fonksiyonu
  const handleDeleteCity = (cityId) => {
    setCities(cities.filter((city) => city.SehirID !== cityId));
  };

  // Yeni Şehir Ekleme Fonksiyonu
  const handleAddCity = (newCity) => {
    setCities([...cities, { SehirID: cities.length + 1, ...newCity }]);
    setIsPopupOpen(false); // Popup'u kapat
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Şehir Listesi</h2>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Şehir Ekle
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Şehir ID</th>
            <th className="border border-gray-300 px-4 py-2">Şehir Adı</th>
            <th className="border border-gray-300 px-4 py-2">Şehir Kodu</th>
            <th className="border border-gray-300 px-4 py-2">Nüfus</th>
            <th className="border border-gray-300 px-4 py-2">Ülke</th>
            <th className="border border-gray-300 px-4 py-2">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.SehirID}>
              <td className="border border-gray-300 px-4 py-2">{city.SehirID}</td>
              <td className="border border-gray-300 px-4 py-2">{city.SehirAdi}</td>
              <td className="border border-gray-300 px-4 py-2">{city.SehirKodu}</td>
              <td className="border border-gray-300 px-4 py-2">{city.Nufus}</td>
              <td className="border border-gray-300 px-4 py-2">{city.UlkeAdi}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleDeleteCity(city.SehirID)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <CreateCity
          countries={countries}
          onClose={() => setIsPopupOpen(false)}
          onSave={handleAddCity}
        />
      )}
    </div>
  );
};

export default CityList;
