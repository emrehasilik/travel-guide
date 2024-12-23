import React, { useState, useEffect } from 'react';
import usePassengerAddressStore from '../store/passengerAddressStore';
import useCityStore from '../store/cityStore';
import useCountryStore from '../store/countryStore';
import { useNavigate } from 'react-router-dom';

const CreateAddress = ({ onClose, passengerId }) => {
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [cityId, setCityId] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [countryId, setCountryId] = useState('');
  const { addAddress } = usePassengerAddressStore();
  const { cities, fetchCities } = useCityStore();
  const { countries, fetchCountries } = useCountryStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCities();
    fetchCountries();
  }, [fetchCities, fetchCountries]);

  const handleSave = async () => {
    if (addressLine1.trim() === '' || cityId.trim() === '' || countryId.trim() === '') return;
    await addAddress(passengerId, addressLine1, addressLine2, cityId, postalCode, countryId);
    onClose(); // Popup'ı kapat
    navigate('/passengerList'); // Yolcu listesine yönlendir
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Yeni Adres Ekle</h3>
        {/* Adres Satırı 1 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Adres Satırı 1</label>
          <input
            type="text"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Adres satırı 1 giriniz"
          />
        </div>
        {/* Adres Satırı 2 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Adres Satırı 2</label>
          <input
            type="text"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Adres satırı 2 giriniz"
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
        {/* Posta Kodu */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Posta Kodu</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Posta kodunu giriniz"
          />
        </div>
        {/* Ülke Seçimi */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ülke</label>
          <select
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Ülke seçiniz</option>
            {countries.map((country) => (
              <option key={country.UlkeID} value={country.UlkeID}>
                {country.UlkeAdi}
              </option>
            ))}
          </select>
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

export default CreateAddress;