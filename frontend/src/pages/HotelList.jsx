import React, { useEffect, useState } from 'react';
import useHotelStore from '../store/hotelStore';
import CreateHotel from '../components/CreateHotel';

const HotelList = () => {
  const { hotels, fetchHotels, deleteHotel } = useHotelStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Otel Listesi</h2>
      <button
        onClick={handleOpenPopup}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Otel Ekle
      </button>
      <ul className="list-none p-0">
        {hotels.map((hotel) => (
          <li key={hotel.OtelID} className="flex justify-between items-center p-2 mb-2 bg-white border border-gray-300 rounded">
            {hotel.OtelAdi}
            <button className="bg-red-500 text-white p-2 rounded" onClick={() => deleteHotel(hotel.OtelID)}>
              Sil
            </button>
          </li>
        ))}
      </ul>
      {isPopupOpen && <CreateHotel onClose={handleClosePopup} />}
    </div>
  );
};

export default HotelList;
