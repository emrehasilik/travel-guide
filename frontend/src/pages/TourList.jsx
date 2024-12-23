import React, { useEffect } from 'react';
import useTourStore from '../store/tourStore';
import { useNavigate } from 'react-router-dom';

const TourList = () => {
  const { tours, fetchTours, deleteTour } = useTourStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const handleAddTour = () => {
    navigate('/createTour');
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
          <li key={tour.TurID} className="flex justify-between items-center p-2 mb-2 bg-white border border-gray-300 rounded">
            <div>
              <div>{tour.TurAdi}</div>
              <div className="text-sm text-gray-500">{tour.Aciklama}</div>
            </div>
            <button className="bg-red-500 text-white p-2 rounded" onClick={() => deleteTour(tour.TurID)}>
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourList;
