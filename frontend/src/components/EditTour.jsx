import React, { useState } from 'react';
import useTourStore from '../store/tourStore';

const EditTour = ({ tour, onClose }) => {
  const [turAdi, setTurAdi] = useState(tour.TurAdi);
  const [baslangicTarihi, setBaslangicTarihi] = useState(tour.BaslangicTarihi);
  const [bitisTarihi, setBitisTarihi] = useState(tour.BitisTarihi);
  const [rotaAdi, setRotaAdi] = useState(tour.RotaAdi);
  const [rehberAdi, setRehberAdi] = useState(tour.RehberAdi);
  const [ucakBilgisi, setUcakBilgisi] = useState(tour.UcakBilgisi);
  const { updateTour } = useTourStore();

  const handleSave = async () => {
    const updatedTour = {
      ...tour,
      TurAdi: turAdi,
      BaslangicTarihi: baslangicTarihi,
      BitisTarihi: bitisTarihi,
      RotaAdi: rotaAdi,
      RehberAdi: rehberAdi,
      UcakBilgisi: ucakBilgisi,
    };
    await updateTour(updatedTour);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Tur Düzenle</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tur Adı</label>
          <input
            type="text"
            value={turAdi}
            onChange={(e) => setTurAdi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
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
          <label className="block text-sm font-medium mb-1">Rota Adı</label>
          <input
            type="text"
            value={rotaAdi}
            onChange={(e) => setRotaAdi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rehber Adı</label>
          <input
            type="text"
            value={rehberAdi}
            onChange={(e) => setRehberAdi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Uçak Bilgisi</label>
          <input
            type="text"
            value={ucakBilgisi}
            onChange={(e) => setUcakBilgisi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
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

export default EditTour;