import React, { useState } from 'react';
import CreateHotel from '../components/CreateHotel';

const Hotel = () => {
  const [hotels, setHotels] = useState([
    {
      OtelID: 1,
      OtelAdi: 'Hilton İstanbul',
      SehirID: 1,
      YildizSayisi: 5,
      Aciklama: 'Lüks bir otel.',
    },
    {
      OtelID: 2,
      OtelAdi: 'Ankara Plaza Hotel',
      SehirID: 2,
      YildizSayisi: 4,
      Aciklama: 'Konforlu bir şehir oteli.',
    },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Yeni otel ekleme fonksiyonu
  const handleAddHotel = (newHotel) => {
    setHotels([...hotels, { OtelID: hotels.length + 1, ...newHotel }]);
    setIsPopupOpen(false); // Popup'u kapat
  };

  // Otel silme fonksiyonu
  const handleDeleteHotel = (otelID) => {
    setHotels(hotels.filter((hotel) => hotel.OtelID !== otelID));
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Otel Listesi</h2>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Otel Ekle
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Otel Adı</th>
            <th className="border border-gray-300 px-4 py-2">Şehir ID</th>
            <th className="border border-gray-300 px-4 py-2">Yıldız Sayısı</th>
            <th className="border border-gray-300 px-4 py-2">Açıklama</th>
            <th className="border border-gray-300 px-4 py-2">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.OtelID}>
              <td className="border border-gray-300 px-4 py-2">{hotel.OtelAdi}</td>
              <td className="border border-gray-300 px-4 py-2">{hotel.SehirID}</td>
              <td className="border border-gray-300 px-4 py-2">{hotel.YildizSayisi}</td>
              <td className="border border-gray-300 px-4 py-2">{hotel.Aciklama}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleDeleteHotel(hotel.OtelID)}
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
        <CreateHotel
          onClose={() => setIsPopupOpen(false)}
          onSave={handleAddHotel}
        />
      )}
    </div>
  );
};

export default Hotel;
