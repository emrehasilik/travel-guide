// src/pages/passengerNew.jsx
import React, { useEffect, useState } from 'react';
import usePassengerStoreNew from '../store/passengerStore';
import usePassengerAddressStoreNew from '../store/passengerAddressStore';
import CreatePassengerNew from '../components/CreatePassenger';
import CreateAddressNew from '../components/CreateAddress';

const PassengerNew = () => {
  const { passengers, fetchPassengers, deletePassenger } = usePassengerStoreNew();
  const { addresses, fetchAddresses } = usePassengerAddressStoreNew();

  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [selectedPassengerId, setSelectedPassengerId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    fetchPassengers();
    fetchAddresses();
  }, [fetchPassengers, fetchAddresses]);

  // Seçili yolcunun adreslerini filtrele
  const filteredAddresses = addresses.filter(
    (addr) => addr.YolcuID === selectedPassengerId
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Yolcu Listesi</h1>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowPassengerForm(true)}
      >
        Yolcu Ekle
      </button>

      {/* Yolcu Listesi */}
      <ul className="space-y-2">
        {passengers.map((passenger) => (
          <li
            key={passenger.YolcuID}
            className="border p-2 rounded flex justify-between items-center"
          >
            <div>
              <div>
                <strong>{passenger.Ad} {passenger.Soyad}</strong> 
              </div>
              <div className="text-sm text-gray-600">
                Email: {passenger.Email || 'N/A'}, Tel: {passenger.Telefon || 'N/A'}
              </div>
            </div>

            <div className="space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => {
                  setSelectedPassengerId(passenger.YolcuID);
                }}
              >
                Adresleri Gör
              </button>
              <button
                className="bg-purple-500 text-white px-2 py-1 rounded"
                onClick={() => {
                  setSelectedPassengerId(passenger.YolcuID);
                  setShowAddressForm(true);
                }}
              >
                Adres Ekle
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => deletePassenger(passenger.YolcuID)}
              >
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Seçili Yolcunun Adresleri */}
      {selectedPassengerId && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">
            Yolcu ID: {selectedPassengerId} - Adres Listesi
          </h2>
          {filteredAddresses.length === 0 ? (
  <p>Bu yolcuya kayıtlı adres yok.</p>
) : (
  <ul className="space-y-2">
    {filteredAddresses.map((addr) => (
      <li key={addr.YolcuAdresID} className="border p-2 rounded">
        <p><strong>Adres Satırı 1:</strong> {addr.AdresSatiri1 || 'N/A'}</p>
        <p><strong>Adres Satırı 2:</strong> {addr.AdresSatiri2 || 'N/A'}</p>

        {/*
          Artık "ID" yerine "Ad" döndüğümüz için:
        */}
        <p><strong>Şehir:</strong> {addr.SehirAdi || 'N/A'}</p>
        <p><strong>Ülke:</strong> {addr.UlkeAdi || 'N/A'}</p>

        <p><strong>Posta Kodu:</strong> {addr.PostaKodu || 'N/A'}</p>
      </li>
    ))}
  </ul>
)}

        </div>
      )}

      {showPassengerForm && (
        <CreatePassengerNew onClose={() => setShowPassengerForm(false)} />
      )}
      {showAddressForm && selectedPassengerId && (
        <CreateAddressNew
          onClose={() => setShowAddressForm(false)}
          passengerId={selectedPassengerId}
        />
      )}
    </div>
  );
};

export default PassengerNew;
