import React, { useState } from 'react';

const CreateRehber = ({ onClose, onSave }) => {
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [telefon, setTelefon] = useState('');
  const [email, setEmail] = useState('');
  const [cinsiyet, setCinsiyet] = useState('');
  const [deneyimYili, setDeneyimYili] = useState('');
  const [diller, setDiller] = useState([]);

  const availableLanguages = ['Türkçe', 'İngilizce', 'Almanca', 'Fransızca', 'İspanyolca'];

  const handleSave = () => {
    if (!ad.trim() || !soyad.trim() || !telefon.trim() || !email.trim()) return;

    const newRehber = {
      Ad: ad,
      Soyad: soyad,
      Telefon: telefon,
      Email: email,
      Cinsiyet: cinsiyet,
      DeneyimYili: parseInt(deneyimYili, 10),
      Diller: diller,
    };
    onSave(newRehber);
    onClose();
  };

  const handleLanguageChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    setDiller(selectedOptions.map((option) => option.value));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Yeni Rehber Ekle</h3>

        {/* Ad */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ad</label>
          <input
            type="text"
            value={ad}
            onChange={(e) => setAd(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Ad giriniz"
          />
        </div>

        {/* Soyad */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Soyad</label>
          <input
            type="text"
            value={soyad}
            onChange={(e) => setSoyad(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Soyad giriniz"
          />
        </div>

        {/* Telefon */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Telefon</label>
          <input
            type="text"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Telefon giriniz"
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
            placeholder="Email giriniz"
          />
        </div>

        {/* Cinsiyet */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Cinsiyet</label>
          <input
            type="text"
            value={cinsiyet}
            onChange={(e) => setCinsiyet(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Cinsiyet giriniz (Erkek/Kadın)"
          />
        </div>

        {/* Deneyim Yılı */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Deneyim Yılı</label>
          <input
            type="number"
            value={deneyimYili}
            onChange={(e) => setDeneyimYili(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Deneyim yılı giriniz"
          />
        </div>

        {/* Diller */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Diller</label>
          <select
            multiple
            value={diller}
            onChange={handleLanguageChange}
            className="w-full px-3 py-2 border rounded"
          >
            {availableLanguages.map((language, index) => (
              <option key={index} value={language}>
                {language}
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

export default CreateRehber;
