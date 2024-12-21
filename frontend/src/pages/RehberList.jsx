import React, { useState } from 'react';
import CreateRehber from '../components/CreateRehber';

const RehberList = () => {
  const [rehberler, setRehberler] = useState([
    {
      RehberID: 1,
      Ad: 'Ahmet',
      Soyad: 'Yılmaz',
      Telefon: '0532 123 45 67',
      Email: 'ahmet@example.com',
      Cinsiyet: 'Erkek',
      DeneyimYili: 5,
      Diller: ['Türkçe', 'İngilizce'],
    },
    {
      RehberID: 2,
      Ad: 'Ayşe',
      Soyad: 'Kara',
      Telefon: '0543 987 65 43',
      Email: 'ayse@example.com',
      Cinsiyet: 'Kadın',
      DeneyimYili: 3,
      Diller: ['Almanca', 'Fransızca'],
    },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Yeni rehber ekleme fonksiyonu
  const handleAddRehber = (newRehber) => {
    setRehberler([
      ...rehberler,
      { RehberID: rehberler.length + 1, ...newRehber },
    ]);
    setIsPopupOpen(false); // Popup'u kapat
  };

  // Rehber silme fonksiyonu
  const handleDeleteRehber = (rehberID) => {
    setRehberler(rehberler.filter((rehber) => rehber.RehberID !== rehberID));
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Rehber Listesi</h2>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Rehber Ekle
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Ad</th>
            <th className="border border-gray-300 px-4 py-2">Soyad</th>
            <th className="border border-gray-300 px-4 py-2">Telefon</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Cinsiyet</th>
            <th className="border border-gray-300 px-4 py-2">Deneyim Yılı</th>
            <th className="border border-gray-300 px-4 py-2">Diller</th>
            <th className="border border-gray-300 px-4 py-2">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {rehberler.map((rehber) => (
            <tr key={rehber.RehberID}>
              <td className="border border-gray-300 px-4 py-2">{rehber.Ad}</td>
              <td className="border border-gray-300 px-4 py-2">{rehber.Soyad}</td>
              <td className="border border-gray-300 px-4 py-2">{rehber.Telefon}</td>
              <td className="border border-gray-300 px-4 py-2">{rehber.Email}</td>
              <td className="border border-gray-300 px-4 py-2">{rehber.Cinsiyet}</td>
              <td className="border border-gray-300 px-4 py-2">{rehber.DeneyimYili}</td>
              <td className="border border-gray-300 px-4 py-2">
                {rehber.Diller.join(', ')}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleDeleteRehber(rehber.RehberID)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <CreateRehber
          onClose={() => setIsPopupOpen(false)}
          onSave={handleAddRehber}
        />
      )}
    </div>
  );
};

export default RehberList;
