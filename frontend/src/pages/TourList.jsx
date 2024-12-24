import React, { useEffect, useState } from 'react';
import useTourStore from '../store/tourStore';
import { useNavigate } from 'react-router-dom';
import EditTour from '../components/EditTour';
import TourDetails from '../components/TourDetails';

const TourList = () => {
  const { tours, fetchTours, deleteTour } = useTourStore();
  const navigate = useNavigate();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
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

  const handleOpenDetailsPopup = (tour) => {
    setSelectedTour(tour);
    setIsDetailsPopupOpen(true);
  };

  const handleCloseDetailsPopup = () => {
    setIsDetailsPopupOpen(false);
    setSelectedTour(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Tur Listesi</h2>
      <button
        onClick={handleAddTour}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Tur Ekle
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {tours.map((tour) => (
          <div key={tour.TurID} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="font-bold text-xl">{tour.TurAdi}</span>
              </div>
              <div>
                <button
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                  onClick={() => handleOpenEditPopup(tour)}
                >
                  Düzenle
                </button>
                <button
                  className="bg-green-500 text-white p-2 rounded mr-2"
                  onClick={() => handleOpenDetailsPopup(tour)}
                >
                  Detaylar
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => deleteTour(tour.TurID)}
                >
                  Sil
                </button>
              </div>
            </div>
            <div className="mt-8">
              <p><strong>Başlangıç Tarihi:</strong> {tour.BaslangicTarihi}</p>
          
            </div>
          </div>
        ))}
      </div>
      {isEditPopupOpen && <EditTour tour={selectedTour} onClose={handleCloseEditPopup} />}
      {isDetailsPopupOpen && <TourDetails tour={selectedTour} onClose={handleCloseDetailsPopup} />}
    </div>
  );
};

export default TourList;