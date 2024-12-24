import React, { useState, useEffect } from 'react';
import useTourStore from '../store/tourStore';
import { useNavigate } from 'react-router-dom';

const CreateTour = () => {
  const [newTourName, setNewTourName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedGuide, setSelectedGuide] = useState('');
  const [selectedPlane, setSelectedPlane] = useState('');
  const [tourType, setTourType] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('');
  const [quota, setQuota] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  const {
    createTour, // createTour fonksiyonunu destructure ettik
    fetchRoutes,
    fetchGuides,
    fetchPlanes,
    routes,
    guides,
    planes,
  } = useTourStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchRoutes();
    fetchGuides();
    fetchPlanes();
  }, [fetchRoutes, fetchGuides, fetchPlanes]);

  const handleSave = () => {
    if (newTourName.trim() === '' || startDate === '' || endDate === '' || selectedRoute === '' || selectedGuide === '') return;

    const newTour = {
      TurAdi: newTourName,
      BaslangicTarihi: startDate,
      BitisTarihi: endDate,
      RotaID: selectedRoute,
      RehberID: selectedGuide,
      UcakID: selectedPlane,
      TurTuru: tourType,
      Fiyat: price,
      DovizCinsi: currency,
      Kontenjan: quota,
      Aciklama: description,
      AktifMi: isActive,
    };

    createTour(newTour); // Yeni tur ekleme işlemi
    navigate('/tourList'); // Tur listesi sayfasına yönlendirme
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Yeni Tur Ekle</h2>
      {/* Tur Adı */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tur Adı</label>
        <input
          type="text"
          value={newTourName}
          onChange={(e) => setNewTourName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Tur adını giriniz"
        />
      </div>
      {/* Başlangıç Tarihi */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Başlangıç Tarihi</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      {/* Bitiş Tarihi */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Bitiş Tarihi</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      {/* Rota */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Rota</label>
        <select
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
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
      {/* Rehber */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Rehber</label>
        <select
          value={selectedGuide}
          onChange={(e) => setSelectedGuide(e.target.value)}
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
      {/* Uçak */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Uçak</label>
        <select
          value={selectedPlane}
          onChange={(e) => setSelectedPlane(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Uçak seçiniz</option>
          {planes.map((plane) => (
            <option key={plane.UcakID} value={plane.UcakID}>
              {plane.UcakFirmaAdi}
            </option>
          ))}
        </select>
      </div>
      {/* Tur Türü */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tur Türü</label>
        <input
          type="text"
          value={tourType}
          onChange={(e) => setTourType(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Tur türünü giriniz"
        />
      </div>
      {/* Fiyat */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Fiyat</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Fiyatı giriniz"
        />
      </div>
      {/* Döviz Cinsi */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Döviz Cinsi</label>
        <input
          type="text"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Döviz cinsini giriniz"
        />
      </div>
      {/* Kontenjan */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Kontenjan</label>
        <input
          type="number"
          value={quota}
          onChange={(e) => setQuota(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Kontenjanı giriniz"
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
      {/* Aktif Mi */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Aktif Mi</label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="mr-2"
        />
        Aktif
      </div>
      {/* Butonlar */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => navigate('/tourList')}
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
  );
};

export default CreateTour;
