import React, { useState } from 'react';

const CreateCity = ({ onClose, onSave }) => {
  const [newCityName, setNewCityName] = useState('');
  const [newCityCode, setNewCityCode] = useState('');
  const [newCityPopulation, setNewCityPopulation] = useState('');
  const [newCountry, setNewCountry] = useState('');

  const handleSave = () => {
    if (!newCityName.trim() || !newCityCode.trim() || !newCityPopulation.trim() || !newCountry.trim()) return;

    const newCity = {
      SehirAdi: newCityName,
      SehirKodu: newCityCode,
      Nufus: parseInt(newCityPopulation, 10),
      UlkeAdi: newCountry,
    };
    onSave(newCity);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Yeni Şehir Ekle</h3>

        {/* Şehir Adı */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Şehir Adı</label>
          <input
            type="text"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Şehir adını giriniz"
          />
        </div>

        {/* Şehir Kodu */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Şehir Kodu</label>
          <input
            type="text"
            value={newCityCode}
            onChange={(e) => setNewCityCode(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Şehir kodunu giriniz"
          />
        </div>

        {/* Nüfus */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nüfus</label>
          <input
            type="number"
            value={newCityPopulation}
            onChange={(e) => setNewCityPopulation(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Şehir nüfusunu giriniz"
          />
        </div>

        {/* Ülke */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ülke</label>
          <input
            type="text"
            value={newCountry}
            onChange={(e) => setNewCountry(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Ülke adını giriniz"
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

export default CreateCity;
