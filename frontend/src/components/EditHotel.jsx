import React, { useState, useEffect } from 'react';
import useHotelStore from '../store/hotelStore';
import useCityStore from '../store/cityStore';

const EditHotel = ({ hotel, onClose }) => {
  const [otelAdi, setOtelAdi] = useState(hotel.OtelAdi);
  const [sehirID, setSehirID] = useState(hotel.SehirID);
  const [yildizSayisi, setYildizSayisi] = useState(hotel.YildizSayisi);
  const [aciklama, setAciklama] = useState(hotel.Aciklama);
  const { updateHotel } = useHotelStore();
  const { cities, fetchCities } = useCityStore();

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const handleSave = async () => {
    const updatedHotel = {
      ...hotel,
      OtelAdi: otelAdi,
      SehirID: sehirID,
      YildizSayisi: yildizSayisi,
      Aciklama: aciklama,
    };
    await updateHotel(updatedHotel);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Otel Düzenle</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Otel Adı</label>
          <input
            type="text"
            value={otelAdi}
            onChange={(e) => setOtelAdi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Şehir</label>
          <select
            value={sehirID}
            onChange={(e) => setSehirID(e.target.value)}
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Yıldız Sayısı</label>
          <input
            type="number"
            value={yildizSayisi}
            onChange={(e) => setYildizSayisi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Açıklama</label>
          <input
            type="text"
            value={aciklama}
            onChange={(e) => setAciklama(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
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

export default EditHotel;