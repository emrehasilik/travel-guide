import React, { useState } from 'react';
import usePlaneStore from '../store/planeStore';

const CreatePlane = ({ onClose }) => {
  const [newPlaneName, setNewPlaneName] = useState('');
  const { addPlane } = usePlaneStore();

  const handleSave = () => {
    if (newPlaneName.trim() === '') return;
    const newPlane = {
      UcakID: Math.random(), // Gerçek ID yerine API'den dönen ID'yi kullanmalısınız.
      UcakAdi: newPlaneName,
    };
    addPlane(newPlane); // Uçağı kaydet
    onClose(); // Popup'u kapat
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Yeni Uçak Ekle</h3>
        {/* Uçak Adı */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Uçak Adı</label>
          <input
            type="text"
            value={newPlaneName}
            onChange={(e) => setNewPlaneName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Uçak adını giriniz"
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

export default CreatePlane;