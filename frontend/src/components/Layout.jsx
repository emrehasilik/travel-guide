import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-blue-800 text-white">
      <aside className="w-64">
        <div className="p-4 text-xl font-bold border-b border-blue-700">
          Admin Panel
        </div>
        <nav className="mt-4">
          <ul className="space-y-4">
          <li className="px-4 py-2 hover:bg-blue-700">
              <Link to="/createTour" className="block">
                Tur Oluştur
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-blue-700">
              <Link to="/countryList" className="block">
                Ülkeler
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-blue-700">
              <Link to="/cityList" className="block">
                Şehirler
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-blue-700">
              <Link to="/rehberList" className="block">
                Rehberler
              </Link>
            </li>
           
            <li className="px-4 py-2 hover:bg-blue-700">
              <Link to="/hotelList" className="block">
                Oteller
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-blue-700">
              <Link to="/passengerList" className="block">
                Yolcular
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-blue-700">
              <Link to="/tourList" className="block">
                Turlar
              </Link>
            </li>
        
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto bg-gray-100 text-black">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
