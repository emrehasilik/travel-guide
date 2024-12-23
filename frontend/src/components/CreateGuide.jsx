import React, { useState } from 'react';
import useGuideStore from '../store/guideStore';
import { useNavigate } from 'react-router-dom';

const CreateGuide = ({ onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [experience, setExperience] = useState('');
  const [languages, setLanguages] = useState(['']);
  const { addGuide } = useGuideStore();
  const navigate = useNavigate();

  const handleAddLanguage = () => {
    setLanguages([...languages, '']);
  };

  const handleLanguageChange = (index, value) => {
    const newLanguages = [...languages];
    newLanguages[index] = value;
    setLanguages(newLanguages);
  };

  const handleSave = async () => {
    if (firstName.trim() === '' || lastName.trim() === '') return;
    await addGuide(firstName, lastName, phone, email, gender, experience, languages);
    onClose(); // Popup'ı kapat
    navigate('/rehberList'); // Rehber listesine yönlendir
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Yeni Rehber Ekle</h3>
        {/* Ad */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ad</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Adını giriniz"
          />
        </div>
        {/* Soyad */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Soyad</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Soyadını giriniz"
          />
        </div>
        {/* Telefon */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Telefon</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Telefon numarasını giriniz"
          />
        </div>
        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Email adresini giriniz"
          />
        </div>
        {/* Cinsiyet */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Cinsiyet</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Cinsiyetini giriniz"
          />
        </div>
        {/* Deneyim Yılı */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Deneyim Yılı</label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Deneyim yılını giriniz"
          />
        </div>
        {/* Diller */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Diller</label>
          {languages.map((language, index) => (
            <input
              key={index}
              type="text"
              value={language}
              onChange={(e) => handleLanguageChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2"
              placeholder="Dil giriniz"
            />
          ))}
          <button
            onClick={handleAddLanguage}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Dil Ekle
          </button>
        </div>
        {/* Butonlar */}
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

export default CreateGuide;