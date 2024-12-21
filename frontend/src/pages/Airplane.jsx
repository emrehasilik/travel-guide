import React, { useState } from 'react';
import CreateAirplane from '../components/CreateAirplane';

const Airplane = () => {
    const [airplanes, setAirplanes] = useState([
        {
            UcakID: 1,
            UcakFirmaAdi: 'Turkish Airlines',
            UcakModeli: 'Boeing 777',
            Kapasite: 350,
        },
        {
            UcakID: 2,
            UcakFirmaAdi: 'Pegasus',
            UcakModeli: 'Airbus A320',
            Kapasite: 180,
        },
    ]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Yeni uçak ekleme fonksiyonu
    const handleAddAirplane = (newAirplane) => {
        setAirplanes([
            ...airplanes,
            { UcakID: airplanes.length + 1, ...newAirplane },
        ]);
        setIsPopupOpen(false); // Popup'u kapat
    };

    // Uçak silme fonksiyonu
    const handleDeleteAirplane = (ucakID) => {
        setAirplanes(airplanes.filter((airplane) => airplane.UcakID !== ucakID));
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Uçak Listesi</h2>
                <button
                    onClick={() => setIsPopupOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    + Uçak Ekle
                </button>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Firma Adı</th>
                        <th className="border border-gray-300 px-4 py-2">Modeli</th>
                        <th className="border border-gray-300 px-4 py-2">Kapasite</th>
                        <th className="border border-gray-300 px-4 py-2">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {airplanes.map((airplane) => (
                        <tr key={airplane.UcakID}>
                            <td className="border border-gray-300 px-4 py-2">
                                {airplane.UcakFirmaAdi}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {airplane.UcakModeli}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {airplane.Kapasite}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button
                                    onClick={() => handleDeleteAirplane(airplane.UcakID)}
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
                <CreateAirplane
                    onClose={() => setIsPopupOpen(false)}
                    onSave={handleAddAirplane}
                />
            )}
        </div>
    );
};

export default Airplane;
