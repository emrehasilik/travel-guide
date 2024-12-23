import React, { useEffect, useState } from 'react';
import usePlaneStore from '../store/planeStore';
import CreatePlane from '../components/CreatePlane';

const PlaneList = () => {
  const { planes, fetchPlanes, deletePlane } = usePlaneStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchPlanes();
  }, [fetchPlanes]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Uçak Listesi</h2>
      <button
        onClick={handleOpenPopup}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Uçak Ekle
      </button>
      <ul className="list-none p-0">
        {planes.map((plane) => (
          <li
            key={plane.UcakID}
            className="flex justify-between items-center p-2 mb-2 bg-white border border-gray-300 rounded"
          >
            <div>
              <span className="font-bold">{plane.UcakFirmaAdi}</span> - {plane.UcakModel}
            </div>
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => deletePlane(plane.UcakID)}
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
      {isPopupOpen && <CreatePlane onClose={handleClosePopup} />}
    </div>
  );
};

export default PlaneList;
