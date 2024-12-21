import React, { useState } from 'react';

const CreateHotel = ({ onClose, onSave }) => {
  const [otelAdi, setOtelAdi] = useState('');
  const [sehirID, setSehirID] = useState('');
  const [yildizSayisi, setYildizSayisi] = useState('');
  const [aciklama, setAciklama] = useState('');

  const handleSave = () => {
    if (!otelAdi.trim() || !sehirID.trim() || !yildizSayisi.trim()) return;

    const newHotel = {
      OtelAdi: otelAdi,
      SehirID: parseInt(sehirID, 10),
      YildizSayisi: parseInt(yildizSayisi, 10),
      Aciklama: aciklama,
    };
    onSave(newHotel);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Yeni Otel Ekle</h3>

        {/* Otel Adı */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Otel Adı</label>
          <input
            type="text"
            value={otelAdi}
            onChange={(e) => setOtelAdi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Otel adını giriniz"
          />
        </div>

        {/* Şehir ID */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Şehir ID</label>
          <input
            type="number"
            value={sehirID}
            onChange={(e) => setSehirID(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Şehir ID giriniz"
          />
        </div>

        {/* Yıldız Sayısı */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Yıldız Sayısı</label>
          <input
            type="number"
            value={yildizSayisi}
            onChange={(e) => setYildizSayisi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Yıldız sayısını giriniz"
          />
        </div>

        {/* Açıklama */}
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

export default CreateHotel;
