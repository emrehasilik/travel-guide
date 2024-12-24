import React, { useEffect, useState } from 'react';
import useGuideStore from '../store/guideStore';
import CreateGuide from '../components/CreateGuide';
import EditGuide from '../components/EditGuide';

const RehberList = () => {
  const { guides, fetchGuides, deleteGuide } = useGuideStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);

  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOpenEditPopup = (guide) => {
    setSelectedGuide(guide);
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
    setSelectedGuide(null);
  };

  const handleDeleteGuide = async (guideId) => {
    const confirmDelete = window.confirm('Bu rehberi silmek istediğinizden emin misiniz?');
    if (confirmDelete) {
      await deleteGuide(guideId); // Rehberi sil
      alert('Rehber başarıyla silindi.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Rehber Listesi</h2>
      <button
        onClick={handleOpenPopup}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Rehber Ekle
      </button>
      <ul className="list-none p-0">
        {guides.map((guide) => (
          <li key={guide.RehberID} className="flex flex-col p-2 mb-2 bg-white border border-gray-300 rounded">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold">{guide.Ad} {guide.Soyad}</span>
              </div>
              <div>
                <button
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                  onClick={() => handleOpenEditPopup(guide)}
                >
                  Düzenle
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => handleDeleteGuide(guide.RehberID)}
                >
                  Sil
                </button>
              </div>
            </div>
            <div className="mt-2">
              <p><strong>Telefon:</strong> {guide.Telefon}</p>
              <p><strong>Email:</strong> {guide.Email}</p>
              <p><strong>Cinsiyet:</strong> {guide.Cinsiyet}</p>
              <p><strong>Deneyim Yılı:</strong> {guide.DeneyimYili}</p>
              <p><strong>Diller:</strong></p>
              {Array.isArray(guide.Diller) ? (
                guide.Diller.map((dil, index) => (
                  <p key={index} className="ml-4">- {dil}</p>
                ))
              ) : (
                <p>Bilgi yok</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      {isPopupOpen && <CreateGuide onClose={handleClosePopup} />}
      {isEditPopupOpen && <EditGuide guide={selectedGuide} onClose={handleCloseEditPopup} />}
    </div>
  );
};

export default RehberList;
