import React, { useEffect, useState } from 'react';
import usePassengerStore from '../store/passengerStore';
import CreatePassenger from '../components/CreatePassenger';
import AddressDetails from '../components/AddressDetails';

const PassengerList = () => {
  const { passengers, fetchPassengers, deletePassenger } = usePassengerStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      YolcuID: 1,
      AdresSatiri1: 'Atatürk Caddesi No:123',
      AdresSatiri2: 'Daire 5, İstanbul',
      SehirID: 1,
      PostaKodu: '34000',
      UlkeID: 1,
    },
    {
      YolcuID: 2,
      AdresSatiri1: 'Kızılay Sokak No:45',
      AdresSatiri2: 'Çankaya, Ankara',
      SehirID: 2,
      PostaKodu: '06510',
      UlkeID: 1,
    },
  ]);
  const [selectedPassengerId, setSelectedPassengerId] = useState(null);

  useEffect(() => {
    fetchPassengers();
  }, [fetchPassengers]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleShowAddress = (yolcuID) => {
    setSelectedPassengerId(yolcuID);
  };

  const handleCloseAddress = () => {
    setSelectedPassengerId(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Yolcu Listesi</h2>
      <button
        onClick={handleOpenPopup}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Yolcu Ekle
      </button>
      <ul className="list-none p-0">
        {passengers.map((passenger) => (
          <li
            key={passenger.YolcuID}
            className="flex justify-between items-center p-2 mb-2 bg-white border border-gray-300 rounded"
          >
            <div>
              {passenger.Ad} {passenger.Soyad} {/* Ad ve Soyad birleştirildi */}
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => handleShowAddress(passenger.YolcuID)}
              >
                Adres Bilgileri
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => deletePassenger(passenger.YolcuID)}
              >
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isPopupOpen && <CreatePassenger onClose={handleClosePopup} />}
      {selectedPassengerId && (
        <AddressDetails
          addresses={addresses.filter(
            (address) => address.YolcuID === selectedPassengerId
          )}
          onClose={handleCloseAddress}
        />
      )}
    </div>
  );
};

export default PassengerList;
