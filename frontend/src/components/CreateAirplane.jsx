import React, { useState } from 'react';

const CreateAirplane = ({ onClose, onSave }) => {
  const [firmaAdi, setFirmaAdi] = useState('');
  const [modeli, setModeli] = useState('');
  const [kapasite, setKapasite] = useState('');

  const handleSave = () => {
    if (!firmaAdi.trim() || !modeli.trim() || !kapasite.trim()) return;

    const newAirplane = {
      UcakFirmaAdi: firmaAdi,
      UcakModeli: modeli,
      Kapasite: parseInt(kapasite, 10),
    };
    onSave(newAirplane);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Yeni Uçak Ekle</h3>

        {/* Firma Adı */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Firma Adı</label>
          <input
            type="text"
            value={firmaAdi}
            onChange={(e) => setFirmaAdi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Firma adını giriniz"
          />
        </div>

        {/* Modeli */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Modeli</label>
          <input
            type="text"
            value={modeli}
            onChange={(e) => setModeli(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Model adını giriniz"
          />
        </div>

        {/* Kapasite */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Kapasite</label>
          <input
            type="number"
            value={kapasite}
            onChange={(e) => setKapasite(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Kapasite giriniz"
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

export default CreateAirplane;
