import React, { useEffect, useState } from 'react';
import useRouteStore from '../store/routeStore';
import CreateRoute from '../components/CreateRoute';

const RouteList = () => {
  const { routes, fetchRoutes, deleteRoute } = useRouteStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Rota Listesi</h2>
      <button
        onClick={handleOpenPopup}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Rota Ekle
      </button>
      <ul className="list-none p-0">
        {routes.map((route) => (
          <li key={route.RotaID} className="flex justify-between items-center p-2 mb-2 bg-white border border-gray-300 rounded">
            <div>
              <div>{route.RotaAdi}</div>
              <div className="text-sm text-gray-500">{route.Aciklama}</div>
            </div>
            <button className="bg-red-500 text-white p-2 rounded" onClick={() => deleteRoute(route.RotaID)}>
              Sil
            </button>
          </li>
        ))}
      </ul>
      {isPopupOpen && <CreateRoute onClose={handleClosePopup} />}
    </div>
  );
};

export default RouteList;