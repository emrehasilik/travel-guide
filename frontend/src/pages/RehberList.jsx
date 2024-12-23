import React, { useEffect, useState } from 'react';
import useGuideStore from '../store/guideStore';
import CreateGuide from '../components/CreateGuide';

const RehberList = () => {
  const { guides, fetchGuides, deleteGuide } = useGuideStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Rehber Listesi</h2>
      <button
        onClick={handleOpenPopup}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Rehber Ekle
      </button>
      <ul className="list-none p-0">
  {guides.map((guide) => (
    <li key={guide.RehberID} className="flex justify-between items-center p-2 mb-2 bg-white border border-gray-300 rounded">
      {guide.Ad} {guide.Soyad} {/* Ad ve Soyad birleştirildi */}
      <button
        className="bg-red-500 text-white p-2 rounded"
        onClick={() => deleteGuide(guide.RehberID)}
      >
        Sil
      </button>
    </li>
  ))}
</ul>
      {isPopupOpen && <CreateGuide onClose={handleClosePopup} />}
    </div>
  );
};

export default RehberList;