import React, { useState } from 'react';
import useGuideStore from '../store/guideStore';

const EditGuide = ({ guide, onClose }) => {
  const [ad, setAd] = useState(guide.Ad);
  const [soyad, setSoyad] = useState(guide.Soyad);
  const [telefon, setTelefon] = useState(guide.Telefon);
  const [email, setEmail] = useState(guide.Email);
  const [cinsiyet, setCinsiyet] = useState(guide.Cinsiyet);
  const [deneyimYili, setDeneyimYili] = useState(guide.DeneyimYili);
  const [diller, setDiller] = useState(guide.Diller ? guide.Diller.join(', ') : '');
  const { updateGuide } = useGuideStore();

  const handleSave = async () => {
    const updatedGuide = {
      ...guide,
      Ad: ad,
      Soyad: soyad,
      Telefon: telefon,
      Email: email,
      Cinsiyet: cinsiyet,
      DeneyimYili: deneyimYili,
      Diller: diller.split(',').map(dil => dil.trim())
    };
    await updateGuide(updatedGuide);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Rehber Düzenle</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ad</label>
          <input
            type="text"
            value={ad}
            onChange={(e) => setAd(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Soyad</label>
          <input
            type="text"
            value={soyad}
            onChange={(e) => setSoyad(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Telefon</label>
          <input
            type="text"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Cinsiyet</label>
          <input
            type="text"
            value={cinsiyet}
            onChange={(e) => setCinsiyet(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Deneyim Yılı</label>
          <input
            type="number"
            value={deneyimYili}
            onChange={(e) => setDeneyimYili(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Diller</label>
          <input
            type="text"
            value={diller}
            onChange={(e) => setDiller(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Dilleri virgülle ayırarak giriniz"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGuide;