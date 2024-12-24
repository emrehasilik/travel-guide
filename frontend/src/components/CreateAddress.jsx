// src/components/CreateAddressNew.jsx
import React, { useState, useEffect } from 'react';
import useCityStore from '../store/cityStore';
import usePassengerAddressStoreNew from '../store/passengerAddressStore';

const CreateAddressNew = ({ onClose, passengerId }) => {
  const [AdresSatiri1, setAdresSatiri1] = useState('');
  const [AdresSatiri2, setAdresSatiri2] = useState('');
  const [selectedCityName, setSelectedCityName] = useState('');
  const [PostaKodu, setPostaKodu] = useState('');

  const { cities, fetchCities } = useCityStore();
  const createAddress = usePassengerAddressStoreNew((state) => state.createAddress);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  // Seçili şehrin ülkesini bul
  const chosenCity = cities.find((c) => c.SehirAdi === selectedCityName);
  // chosenCity.UlkeID -> Bu ülkeyi bulmak için countryStore'a da bakabilirsiniz

  const handleSave = async () => {
    if (!passengerId || !AdresSatiri1.trim() || !selectedCityName) {
      alert('Zorunlu alanları doldurun.');
      return;
    }
    // cityName'i (SehirAdi) backend'e gönderiyoruz
    // backend createPassengerAddress() -> city tablosunda bu adı arayıp SehirID, UlkeID bulacak
    const success = await createAddress({
      YolcuID: passengerId,
      SehirAdi: selectedCityName,
      AdresSatiri1,
      AdresSatiri2,
      PostaKodu,
    });
    if (success) {
      onClose();
    } else {
      alert('Adres eklenirken hata oluştu');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-semibold mb-4">Adres Ekle</h2>

        {/* Adres Satırı 1 */}
        <label className="block mb-2">
          Adres Satırı 1:
          <input
            value={AdresSatiri1}
            onChange={(e) => setAdresSatiri1(e.target.value)}
            className="border w-full p-1"
          />
        </label>

        {/* Adres Satırı 2 */}
        <label className="block mb-2">
          Adres Satırı 2:
          <input
            value={AdresSatiri2}
            onChange={(e) => setAdresSatiri2(e.target.value)}
            className="border w-full p-1"
          />
        </label>

        {/* Şehir Adı Seçimi */}
        <label className="block mb-2">
          Şehir:
          <select
            value={selectedCityName}
            onChange={(e) => setSelectedCityName(e.target.value)}
            className="border w-full p-1"
          >
            <option value="">Şehir Seçiniz</option>
            {cities.map((city) => (
              <option key={city.SehirID} value={city.SehirAdi}>
                {city.SehirAdi}
              </option>
            ))}
          </select>
        </label>

        {/* Posta Kodu */}
        <label className="block mb-2">
          Posta Kodu:
          <input
            value={PostaKodu}
            onChange={(e) => setPostaKodu(e.target.value)}
            className="border w-full p-1"
          />
        </label>

        {/* Ülke Adı (Otomatik) */}
       {/* Ülke Adı (Otomatik) */}
<label className="block mb-2">
  Ülke:
  <input
    type="text"
    readOnly
    className="border w-full p-1 bg-gray-100"
    value={
      chosenCity // city -> country
        ? chosenCity.UlkeAdi // Artık UlkeAdi'ni gösteriyoruz
        : ''
    }
  />
</label>


        {/* Butonlar */}
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-200 px-3 py-1 rounded">
            İptal
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded">
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAddressNew;
