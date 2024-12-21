import React, { useState } from 'react';

const CreateTour = ({ onClose, onSave }) => {
  const [turAdi, setTurAdi] = useState('');
  const [baslangicTarihi, setBaslangicTarihi] = useState('');
  const [bitisTarihi, setBitisTarihi] = useState('');
  const [rotaID, setRotaID] = useState('');
  const [rehberID, setRehberID] = useState('');
  const [ucakID, setUcakID] = useState('');
  const [turTuru, setTurTuru] = useState('');
  const [fiyat, setFiyat] = useState('');
  const [dovizCinsi, setDovizCinsi] = useState('');
  const [kontenjan, setKontenjan] = useState('');
  const [aciklama, setAciklama] = useState('');

  const handleSave = () => {
    if (!turAdi.trim() || !baslangicTarihi.trim() || !bitisTarihi.trim() || !rotaID.trim() || !rehberID.trim()) return;

    const newTour = {
      TurAdi: turAdi,
      BaslangicTarihi: baslangicTarihi,
      BitisTarihi: bitisTarihi,
      RotaID: parseInt(rotaID, 10),
      RehberID: parseInt(rehberID, 10),
      UcakID: ucakID ? parseInt(ucakID, 10) : null,
      TurTuru: turTuru,
      Fiyat: parseFloat(fiyat),
      DovizCinsi: dovizCinsi,
      Kontenjan: parseInt(kontenjan, 10),
      Aciklama: aciklama,
      AktifMi: true,
    };

    onSave(newTour);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Yeni Tur Ekle</h3>

        {/* Form Alanları */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tur Adı</label>
          <input
            type="text"
            value={turAdi}
            onChange={(e) => setTurAdi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Tur adını giriniz"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Başlangıç Tarihi</label>
          <input
            type="date"
            value={baslangicTarihi}
            onChange={(e) => setBaslangicTarihi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Bitiş Tarihi</label>
          <input
            type="date"
            value={bitisTarihi}
            onChange={(e) => setBitisTarihi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rota ID</label>
          <input
            type="number"
            value={rotaID}
            onChange={(e) => setRotaID(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Rota ID giriniz"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rehber ID</label>
          <input
            type="number"
            value={rehberID}
            onChange={(e) => setRehberID(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Rehber ID giriniz"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Uçak ID</label>
          <input
            type="number"
            value={ucakID}
            onChange={(e) => setUcakID(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Uçak ID giriniz (Opsiyonel)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tur Türü</label>
          <input
            type="text"
            value={turTuru}
            onChange={(e) => setTurTuru(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Tur türünü giriniz"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Fiyat</label>
          <input
            type="number"
            value={fiyat}
            onChange={(e) => setFiyat(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Fiyat giriniz"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Döviz Cinsi</label>
          <input
            type="text"
            value={dovizCinsi}
            onChange={(e) => setDovizCinsi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Döviz cinsi giriniz (TRY, USD, EUR)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Kontenjan</label>
          <input
            type="number"
            value={kontenjan}
            onChange={(e) => setKontenjan(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Kontenjan giriniz"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Açıklama</label>
          <textarea
            value={aciklama}
            onChange={(e) => setAciklama(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Açıklama giriniz"
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

export default CreateTour;
