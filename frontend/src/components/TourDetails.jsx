import React from 'react';

const TourDetails = ({ tour, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Tur Detayları</h3>
        <div className="mb-4">
          <p><strong>Tur Adı:</strong> {tour.TurAdi}</p>
          <p><strong>Başlangıç Tarihi:</strong> {tour.BaslangicTarihi}</p>
          <p><strong>Bitiş Tarihi:</strong> {tour.BitisTarihi}</p>
          <p><strong>Tur Türü:</strong> {tour.TurTuru}</p>
          <p><strong>Fiyat:</strong> {tour.Fiyat}</p>
          <p><strong>Doviz Cinsi:</strong> {tour.DovizCinsi}</p>
          <p><strong>Kontenjan:</strong> {tour.Kontenjan}</p>
          <p><strong>Açıklama:</strong> {tour.Aciklama}</p>
          <p><strong>Rota Adı:</strong> {tour.RotaAdi}</p>
          <p><strong>Rehber Adı:</strong> {tour.RehberAdi}</p>
     
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;