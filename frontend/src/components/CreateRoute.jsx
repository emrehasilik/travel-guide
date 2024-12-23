import React, { useState } from 'react';
import useRouteStore from '../store/routeStore';

const CreateRoute = ({ onClose }) => {
  const [newRouteName, setNewRouteName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const { addRoute } = useRouteStore();

  const handleSave = () => {
    if (newRouteName.trim() === '') return;
    const newRoute = {
      RotaID: Math.random(), // Gerçek ID yerine API'den dönen ID'yi kullanmalısınız.
      RotaAdi: newRouteName,
      Aciklama: description,
      AktifMi: isActive,
    };
    addRoute(newRoute); // Rotayı kaydet
    onClose(); // Popup'u kapat
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Yeni Rota Ekle</h3>
        {/* Rota Adı */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rota Adı</label>
          <input
            type="text"
            value={newRouteName}
            onChange={(e) => setNewRouteName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Rota adını giriniz"
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
        {/* Aktif Mi */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Aktif Mi</label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="mr-2"
          />
          Aktif
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

export default CreateRoute;