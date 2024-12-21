import React, { useState } from 'react';

const CreateCountry = ({ onClose, onSave }) => {
  const [newCountryName, setNewCountryName] = useState('');
  const [newCities, setNewCities] = useState([]);
  const [tempCity, setTempCity] = useState('');

  // Şehir ekle
  const handleAddCity = () => {
    if (tempCity.trim() === '') return;

    setNewCities([...newCities, tempCity]);
    setTempCity(''); // Geçici şehir ismini sıfırla
  };

  // Kaydet
  const handleSave = () => {
    if (newCountryName.trim() === '') return;

    const newCountry = {
      UlkeAdi: newCountryName,
      cities: newCities,
    };
    onSave(newCountry); // Ülkeyi kaydet
    onClose(); // Popup'u kapat
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Yeni Ülke Ekle</h3>

        {/* Ülke Adı */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ülke Adı</label>
          <input
            type="text"
            value={newCountryName}
            onChange={(e) => setNewCountryName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Ülke adını giriniz"
          />
        </div>

        {/* Şehir Ekle */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Şehirler</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={tempCity}
              onChange={(e) => setTempCity(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Şehir adı giriniz"
            />
            <button
              onClick={handleAddCity}
              className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
            >
              + Ekle
            </button>
          </div>
        </div>

        {/* Eklenen Şehirler */}
        <div className="mb-4">
          {newCities.map((city, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 px-3 py-1 text-sm rounded-full mr-2 mb-2"
            >
              {city}
            </span>
          ))}
        </div>

        {/* Butonlar */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCountry;
