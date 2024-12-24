import React, { useEffect, useState } from 'react';
import useTourStore from '../store/tourStore';
import { useNavigate } from 'react-router-dom';
import EditTour from '../components/EditTour';  

const TourList = () => {
  const { tours, fetchTours, deleteTour } = useTourStore();
  const navigate = useNavigate();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const handleAddTour = () => {
    navigate('/createTour');
  };

  const handleOpenEditPopup = (tour) => {
    setSelectedTour(tour);
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
    setSelectedTour(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Tur Listesi</h2>
      <button
        onClick={handleAddTour}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Tur Ekle
      </button>
      <ul className="list-none p-0">
        {tours.map((tour) => (
          <li key={tour.TurID} className="flex flex-col p-2 mb-2 bg-white border border-gray-300 rounded">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold">{tour.TurAdi}</span>
              </div>
              <div>
                <button
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                  onClick={() => handleOpenEditPopup(tour)}
                >
                  Düzenle
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => deleteTour(tour.TurID)}
                >
                  Sil
                </button>
              </div>
            </div>
            <div className="mt-2">
              <p><strong>Başlangıç Tarihi:</strong> {tour.BaslangicTarihi}</p>
              <p><strong>Bitiş Tarihi:</strong> {tour.BitisTarihi}</p>
              <p><strong>Rota Adı:</strong> {tour.RotaAdi}</p>
              <p><strong>Rehber Adı:</strong> {tour.RehberAdi}</p>
              <p><strong>Uçak Bilgisi:</strong> {tour.UcakBilgisi}</p>
            </div>
          </li>
        ))}
      </ul>
      {isEditPopupOpen && <EditTour tour={selectedTour} onClose={handleCloseEditPopup} />}
    </div>
  );
};

export default TourList;