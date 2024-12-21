import React, { useState } from 'react';

const CreatePassenger = ({ onClose, onSave }) => {
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [cinsiyet, setCinsiyet] = useState('');
  const [dogumTarihi, setDogumTarihi] = useState('');
  const [pasaportNo, setPasaportNo] = useState('');
  const [ulkeID, setUlkeID] = useState('');

  const handleSave = () => {
    if (!ad.trim() || !soyad.trim() || !email.trim()) return;

    const newPassenger = {
      Ad: ad,
      Soyad: soyad,
      Email: email,
      Telefon: telefon,
      Cinsiyet: cinsiyet,
      DogumTarihi: dogumTarihi,
      PasaportNo: pasaportNo,
      UlkeID: ulkeID ? parseInt(ulkeID, 10) : null,
    };
    onSave(newPassenger);
    onClose();
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

        {/* Cinsiyet */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Cinsiyet</label>
          <input
            type="text"
            value={cinsiyet}
            onChange={(e) => setCinsiyet(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Cinsiyet giriniz"
          />
        </div>

        {/* Doğum Tarihi */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Doğum Tarihi</label>
          <input
            type="date"
            value={dogumTarihi}
            onChange={(e) => setDogumTarihi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Pasaport No */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Pasaport No</label>
          <input
            type="text"
            value={pasaportNo}
            onChange={(e) => setPasaportNo(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Pasaport No giriniz"
          />
        </div>

        {/* Ülke ID */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ülke ID</label>
          <input
            type="number"
            value={ulkeID}
            onChange={(e) => setUlkeID(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Ülke ID giriniz"
          />
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

export default CreatePassenger;
