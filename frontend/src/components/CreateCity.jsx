import React, { useState, useEffect } from 'react';
import useCityStore from '../store/cityStore';
import useCountryStore from '../store/countryStore';

const CreateCity = ({ onClose, onSave }) => {
  const [cityName, setCityName] = useState('');
  const [countryId, setCountryId] = useState('');
  const [cityCode, setCityCode] = useState('');
  const [population, setPopulation] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addCity } = useCityStore();
  const { countries, fetchCountries } = useCountryStore();

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const handleSave = async () => {
    // Alan doğrulama
    if (!cityName.trim() || !countryId.trim() || !cityCode.trim()) {
      setError('Lütfen gerekli alanları doldurunuz.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await addCity(cityName, countryId, cityCode, population, description);
      if (onSave) onSave(); // Ek bir işlem yapılacaksa
      onClose(); // Popup'ı kapat
    } catch (err) {
      setError('Şehir eklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Yeni Şehir Ekle</h3>

        {/* Hata mesajı */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Şehir Adı */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Şehir Adı</label>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Şehir adını giriniz"
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

        {/* Şehir Kodu */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Şehir Kodu</label>
          <input
            type="text"
            value={cityCode}
            onChange={(e) => setCityCode(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Şehir kodunu giriniz"
          />
        </div>

        {/* Nüfus */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nüfus</label>
          <input
            type="number"
            value={population}
            onChange={(e) => setPopulation(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Nüfusu giriniz"
          />
        </div>

        {/* Açıklama */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Açıklama</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Açıklama giriniz"
          />
        </div>

        {/* Butonlar */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={isLoading}
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCity;
