import React, { useState } from 'react';
import AddressDetails from '../components/AddressDetails';

const Passenger = () => {
  const [passengers, setPassengers] = useState([
    {
      YolcuID: 1,
      Ad: 'Ahmet',
      Soyad: 'Yılmaz',
      Email: 'ahmet@example.com',
      Telefon: '0532 123 45 67',
      Cinsiyet: 'Erkek',
      DogumTarihi: '1990-01-15',
      PasaportNo: 'A12345678',
      UlkeID: 1,
    },
    {
      YolcuID: 2,
      Ad: 'Ayşe',
      Soyad: 'Kara',
      Email: 'ayse@example.com',
      Telefon: '0543 987 65 43',
      Cinsiyet: 'Kadın',
      DogumTarihi: '1985-05-20',
      PasaportNo: 'B98765432',
      UlkeID: 2,
    },
  ]);

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

  const handleShowAddress = (yolcuID) => {
    setSelectedPassengerId(yolcuID);
  };

  const handleCloseAddress = () => {
    setSelectedPassengerId(null);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Yolcu Listesi</h2>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Ad</th>
            <th className="border border-gray-300 px-4 py-2">Soyad</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Telefon</th>
            <th className="border border-gray-300 px-4 py-2">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((passenger) => (
            <tr key={passenger.YolcuID}>
              <td className="border border-gray-300 px-4 py-2">{passenger.Ad}</td>
              <td className="border border-gray-300 px-4 py-2">{passenger.Soyad}</td>
              <td className="border border-gray-300 px-4 py-2">{passenger.Email}</td>
              <td className="border border-gray-300 px-4 py-2">{passenger.Telefon}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleShowAddress(passenger.YolcuID)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Adres Bilgileri
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default Passenger;
