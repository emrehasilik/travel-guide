import React, { useState, useEffect } from 'react';
import useHotelStore from '../store/hotelStore';
import useCityStore from '../store/cityStore';
import { useNavigate } from 'react-router-dom';

const CreateHotel = ({ onClose }) => {
  const [hotelName, setHotelName] = useState('');
  const [cityId, setCityId] = useState('');
  const [starRating, setStarRating] = useState('');
  const [description, setDescription] = useState('');
  const { addHotel } = useHotelStore();
  const { cities, fetchCities } = useCityStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const handleSave = async () => {
    if (hotelName.trim() === '' || cityId.trim() === '') return;
    await addHotel(hotelName, cityId, starRating, description);
    onClose(); // Popup'ı kapat
    navigate('/hotelList'); // Otel listesine yönlendir
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Yeni Otel Ekle</h3>
        {/* Otel Adı */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Otel Adı</label>
          <input
            type="text"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Otel adını giriniz"
          />
        </div>
        {/* Şehir Seçimi */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Şehir</label>
          <select
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Şehir seçiniz</option>
            {cities.map((city) => (
              <option key={city.SehirID} value={city.SehirID}>
                {city.SehirAdi}
              </option>
            ))}
          </select>
        </div>
        {/* Yıldız Sayısı */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Yıldız Sayısı</label>
          <input
            type="number"
            value={starRating}
            onChange={(e) => setStarRating(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Yıldız sayısını giriniz"
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

export default CreateHotel;