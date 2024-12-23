import React, { useState } from 'react';
import useCountryStore from '../store/countryStore';
import { useNavigate } from 'react-router-dom';

const CreateCountry = ({ onClose }) => {
  const [countryName, setCountryName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [description, setDescription] = useState('');
  const { addCountry, fetchCountries } = useCountryStore();
  const navigate = useNavigate();

  const handleSave = async () => {
    if (countryName.trim() === '' || countryCode.trim() === '') return;
    await addCountry(countryName, countryCode, description);
    await fetchCountries(); // Ülke listesini güncelle
    onClose(); // Popup'ı kapat
    navigate('/countryList'); // Ülke listesine yönlendir
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
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Ülke adını giriniz"
          />
        </div>
        {/* Ülke Kodu */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ülke Kodu</label>
          <input
            type="text"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Ülke kodunu giriniz"
          />
        </div>
        {/* Açıklama */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Açıklama</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Açıklama giriniz"
          />
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