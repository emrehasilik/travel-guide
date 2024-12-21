import React from 'react';

const AddressDetails = ({ addresses, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Adres Bilgileri</h3>

        {addresses.map((address, index) => (
          <div key={index} className="mb-4">
            <p>
              <strong>Adres Satırı 1:</strong> {address.AdresSatiri1 || 'N/A'}
            </p>
            <p>
              <strong>Adres Satırı 2:</strong> {address.AdresSatiri2 || 'N/A'}
            </p>
            <p>
              <strong>Şehir ID:</strong> {address.SehirID || 'N/A'}
            </p>
            <p>
              <strong>Posta Kodu:</strong> {address.PostaKodu || 'N/A'}
            </p>
            <p>
              <strong>Ülke ID:</strong> {address.UlkeID || 'N/A'}
            </p>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
