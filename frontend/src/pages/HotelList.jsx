import React, { useEffect, useState } from 'react';
import useHotelStore from '../store/hotelStore';
import useCityStore from '../store/cityStore';
import CreateHotel from '../components/CreateHotel';
import EditHotel from '../components/EditHotel';

const HotelList = () => {
  const { hotels, fetchHotels, deleteHotel } = useHotelStore();
  const { cities, fetchCities } = useCityStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    fetchHotels();
    fetchCities();
  }, [fetchHotels, fetchCities]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOpenEditPopup = (hotel) => {
    setSelectedHotel(hotel);
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
    setSelectedHotel(null);
  };

  const getCityName = (cityId) => {
    const city = cities.find((city) => city.SehirID === cityId);
    return city ? city.SehirAdi : 'Bilinmiyor';
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
          <li key={hotel.OtelID} className="flex flex-col p-2 mb-2 bg-white border border-gray-300 rounded">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold">{hotel.OtelAdi}</span>
              </div>
              <div>
                <button
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                  onClick={() => handleOpenEditPopup(hotel)}
                >
                  Düzenle
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => deleteHotel(hotel.OtelID)}
                >
                  Sil
                </button>
              </div>
            </div>
            <div className="mt-2">
              <p><strong>Şehir:</strong> {getCityName(hotel.SehirID)}</p>
              <p><strong>Yıldız Sayısı:</strong> {hotel.YildizSayisi}</p>
              <p><strong>Açıklama:</strong> {hotel.Aciklama}</p>
            </div>
          </li>
        ))}
      </ul>
      {isPopupOpen && <CreateHotel onClose={handleClosePopup} />}
      {isEditPopupOpen && <EditHotel hotel={selectedHotel} onClose={handleCloseEditPopup} />}
    </div>
  );
};

export default HotelList;