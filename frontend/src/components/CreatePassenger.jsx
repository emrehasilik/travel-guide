import React, { useState, useEffect } from 'react';
import usePassengerStore from '../store/passengerStore';
import useCountryStore from '../store/countryStore';
import CreateAddress from './CreateAddress';
import { useNavigate } from 'react-router-dom';

const CreatePassenger = ({ onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [passportNo, setPassportNo] = useState('');
  const [countryId, setCountryId] = useState('');
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [passengerId, setPassengerId] = useState(null);
  const { addPassenger } = usePassengerStore();
  const { countries, fetchCountries } = useCountryStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const handleSave = async () => {
    if (firstName.trim() === '' || lastName.trim() === '') return;
    const newPassenger = await addPassenger(firstName, lastName, email, phone, gender, birthDate, passportNo, countryId);
    setPassengerId(newPassenger.YolcuID);
    onClose(); // Popup'ı kapat
    navigate('/passengerList'); // Yolcu listesine yönlendir
  };

  const handleAddAddress = () => {
    setShowAddressPopup(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Yeni Yolcu Ekle</h3>
        {/* Ad */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ad</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Adını giriniz"
          />
        </div>
        {/* Soyad */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Soyad</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Soyadını giriniz"
          />
        </div>
        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Email adresini giriniz"
          />
        </div>
        {/* Telefon */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Telefon</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Telefon numarasını giriniz"
          />
        </div>
        {/* Cinsiyet */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Cinsiyet</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Cinsiyetini giriniz"
          />
        </div>
        {/* Doğum Tarihi */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Doğum Tarihi</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {/* Pasaport No */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Pasaport No</label>
          <input
            type="text"
            value={passportNo}
            onChange={(e) => setPassportNo(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Pasaport numarasını giriniz"
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
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={handleAddAddress}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Adres Ekle
          </button>
        </div>
      </div>
      {showAddressPopup && <CreateAddress onClose={() => setShowAddressPopup(false)} passengerId={passengerId} />}
    </div>
  );
};

export default CreatePassenger;