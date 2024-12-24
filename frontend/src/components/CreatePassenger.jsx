// src/components/CreatePassenger.jsx

import React, { useState, useEffect } from 'react';
import usePassengerStore from '../store/passengerStore'; // <-- Yolcu store'un
import useCountryStore from '../store/countryStore';     // <-- Senin eklediğin store

const CreatePassenger = ({ onClose }) => {
  // Form state
  const [Ad, setAd] = useState('');
  const [Soyad, setSoyad] = useState('');
  const [Email, setEmail] = useState('');
  const [Telefon, setTelefon] = useState('');
  const [Cinsiyet, setCinsiyet] = useState('');
  const [DogumTarihi, setDogumTarihi] = useState('');
  const [PasaportNo, setPasaportNo] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState(''); 
  // Eğer kullanıcı hiç seçmezse '' (boş string) kalacak

  // Store fonksiyonları
  const { createPassenger } = usePassengerStore();
  const { countries, fetchCountries } = useCountryStore();

  // Sayfa ilk yüklendiğinde ülke listesini çek
  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const handleSave = async () => {
    // Basit validasyon
    if (!Ad.trim() || !Soyad.trim()) {
      alert('Ad ve Soyad boş bırakılamaz!');
      return;
    }

    // selectedCountryId boşsa null ver, değilse integer'a çevir
    let UlkeID = null;
    if (selectedCountryId) {
      UlkeID = parseInt(selectedCountryId, 10);
    }

    // Boş tarih gönderilirse veritabanında nasıl karşılayacağımızı
    // (NULL mu, yoksa '' mı?) backend tarafında ayarlıyoruz.
    const payload = {
      Ad,
      Soyad,
      Email,
      Telefon,
      Cinsiyet,
      DogumTarihi: DogumTarihi || null,
      PasaportNo,
      UlkeID,
    };

    const success = await createPassenger(payload);
    if (success) {
      onClose();
    } else {
      alert('Yolcu eklenirken bir hata oluştu!');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="text-xl font-semibold mb-4">Yeni Yolcu Ekle</h2>
        
        <label className="block mb-2">
          Ad:
          <input
            type="text"
            value={Ad}
            onChange={(e) => setAd(e.target.value)}
            className="border p-1 w-full"
          />
        </label>

        <label className="block mb-2">
          Soyad:
          <input
            type="text"
            value={Soyad}
            onChange={(e) => setSoyad(e.target.value)}
            className="border p-1 w-full"
          />
        </label>

        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-1 w-full"
          />
        </label>

        <label className="block mb-2">
          Telefon:
          <input
            type="text"
            value={Telefon}
            onChange={(e) => setTelefon(e.target.value)}
            className="border p-1 w-full"
          />
        </label>

        <label className="block mb-2">
          Cinsiyet:
          <input
            type="text"
            value={Cinsiyet}
            onChange={(e) => setCinsiyet(e.target.value)}
            className="border p-1 w-full"
          />
        </label>

        <label className="block mb-2">
          Doğum Tarihi:
          <input
            type="date"
            value={DogumTarihi}
            onChange={(e) => setDogumTarihi(e.target.value)}
            className="border p-1 w-full"
          />
        </label>

        <label className="block mb-2">
          Pasaport No:
          <input
            type="text"
            value={PasaportNo}
            onChange={(e) => setPasaportNo(e.target.value)}
            className="border p-1 w-full"
          />
        </label>

        {/* Ülke Seçimi */}
        <label className="block mb-2">
          Ülke:
          <select
            className="border p-1 w-full"
            value={selectedCountryId}
            onChange={(e) => setSelectedCountryId(e.target.value)}
          >
            <option value="">Ülke Seçiniz</option>
            {countries.map((country) => (
              <option key={country.UlkeID} value={country.UlkeID}>
                {country.UlkeAdi} ({country.UlkeKodu})
              </option>
            ))}
          </select>
        </label>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePassenger;
