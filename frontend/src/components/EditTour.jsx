import React, { useState, useEffect } from 'react';
import useTourStore from '../store/tourStore';

const EditTour = ({ tour, onClose }) => {
  const {
    routes,
    guides,
    planes,
    fetchRoutes,
    fetchGuides,
    fetchPlanes,
    updateTour,
  } = useTourStore();

  const [turAdi, setTurAdi] = useState(tour.TurAdi || '');
  const [baslangicTarihi, setBaslangicTarihi] = useState(
    tour.BaslangicTarihi?.slice(0, 10) || ''
  );
  const [bitisTarihi, setBitisTarihi] = useState(
    tour.BitisTarihi?.slice(0, 10) || ''
  );
  const [rotaId, setRotaId] = useState(tour.RotaID || '');
  const [rehberId, setRehberId] = useState(tour.RehberID || '');
  const [ucakId, setUcakId] = useState(tour.UcakID || '');

  useEffect(() => {
    fetchRoutes();
    fetchGuides();
    fetchPlanes();
  }, [fetchRoutes, fetchGuides, fetchPlanes]);

  const handleSave = async () => {
    const updatedTour = {
      ...tour,
      TurAdi: turAdi,
      BaslangicTarihi: baslangicTarihi,
      BitisTarihi: bitisTarihi,
      RotaID: Number(rotaId),
      RehberID: Number(rehberId),
      UcakID: ucakId ? Number(ucakId) : null,
    };
    await updateTour(updatedTour);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Tur Düzenle</h3>

        {/* Tur Adı */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tur Adı</label>
          <input
            type="text"
            value={turAdi}
            onChange={(e) => setTurAdi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Başlangıç Tarihi */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Başlangıç Tarihi</label>
          <input
            type="date"
            value={baslangicTarihi}
            onChange={(e) => setBaslangicTarihi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Bitiş Tarihi */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Bitiş Tarihi</label>
          <input
            type="date"
            value={bitisTarihi}
            onChange={(e) => setBitisTarihi(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Rota Seçimi */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rota</label>
          <select
            value={rotaId}
            onChange={(e) => setRotaId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Rota seçiniz</option>
            {routes.map((route) => (
              <option key={route.RotaID} value={route.RotaID}>
                {route.RotaAdi}
              </option>
            ))}
          </select>
        </div>

        {/* Rehber Seçimi */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rehber</label>
          <select
            value={rehberId}
            onChange={(e) => setRehberId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Rehber seçiniz</option>
            {guides.map((guide) => (
              <option key={guide.RehberID} value={guide.RehberID}>
                {guide.Ad} {guide.Soyad}
              </option>
            ))}
          </select>
        </div>

        {/* Uçak Seçimi */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Uçak Bilgisi</label>
          <select
            value={ucakId}
            onChange={(e) => setUcakId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Uçak seçiniz</option>
            {planes.map((plane) => (
              <option key={plane.UcakID} value={plane.UcakID}>
                {plane.UcakFirmaAdi} - {plane.UcakModeli}
              </option>
            ))}
          </select>
        </div>

        {/* Kaydet / İptal Butonları */}
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
