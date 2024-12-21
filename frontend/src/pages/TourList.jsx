import React, { useState } from 'react';
import CreateTour from '../components/CreateTour';

const TourList = () => {
    const [tours, setTours] = useState([
        {
            TurID: 1,
            TurAdi: 'Kapadokya Kültür Turu',
            BaslangicTarihi: '2024-01-10',
            BitisTarihi: '2024-01-15',
            RotaID: 1,
            RehberID: 1,
            UcakID: 2,
            TurTuru: 'Kültür Turu',
            Fiyat: 5000.0,
            DovizCinsi: 'TRY',
            Kontenjan: 25,
            Aciklama: 'Kapadokya\'nın büyüleyici güzelliklerini keşfedin.',
            AktifMi: true,
        },
        {
            TurID: 2,
            TurAdi: 'Afrika Safari Turu',
            BaslangicTarihi: '2024-02-01',
            BitisTarihi: '2024-02-10',
            RotaID: 2,
            RehberID: 2,
            UcakID: 3,
            TurTuru: 'Safari',
            Fiyat: 12000.0,
            DovizCinsi: 'USD',
            Kontenjan: 15,
            Aciklama: 'Afrika\'nın vahşi yaşamını deneyimleyin.',
            AktifMi: true,
        },
    ]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Yeni tur ekleme fonksiyonu
    const handleAddTour = (newTour) => {
        setTours([...tours, { TurID: tours.length + 1, ...newTour }]);
        setIsPopupOpen(false); // Popup'u kapat
    };

    // Tur silme fonksiyonu
    const handleDeleteTour = (turID) => {
        setTours(tours.filter((tour) => tour.TurID !== turID));
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Tur Listesi</h2>
                <button
                    onClick={() => setIsPopupOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    + Tur Ekle
                </button>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Tur Adı</th>
                        <th className="border border-gray-300 px-4 py-2">Başlangıç Tarihi</th>
                        <th className="border border-gray-300 px-4 py-2">Bitiş Tarihi</th>
                        <th className="border border-gray-300 px-4 py-2">Fiyat</th>
                        <th className="border border-gray-300 px-4 py-2">Döviz Cinsi</th>
                        <th className="border border-gray-300 px-4 py-2">Kontenjan</th>
                        <th className="border border-gray-300 px-4 py-2">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {tours.map((tour) => (
                        <tr key={tour.TurID}>
                            <td className="border border-gray-300 px-4 py-2">{tour.TurAdi}</td>
                            <td className="border border-gray-300 px-4 py-2">{tour.BaslangicTarihi}</td>
                            <td className="border border-gray-300 px-4 py-2">{tour.BitisTarihi}</td>
                            <td className="border border-gray-300 px-4 py-2">{tour.Fiyat}</td>
                            <td className="border border-gray-300 px-4 py-2">{tour.DovizCinsi}</td>
                            <td className="border border-gray-300 px-4 py-2">{tour.Kontenjan}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button
                                    onClick={() => handleDeleteTour(tour.TurID)}
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
                <CreateTour
                    onClose={() => setIsPopupOpen(false)}
                    onSave={handleAddTour}
                />
            )}
        </div>
    );
};

export default TourList;
