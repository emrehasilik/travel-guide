// src/store/passengerAddressStoreNew.jsx
import { create } from 'zustand';

const usePassengerAddressStoreNew = create((set) => ({
  addresses: [],
  loading: false,
  error: null,

  // Adresleri getir (Tüm adresleri çekip front-end'de filtreleyeceğiz)
  fetchAddresses: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('http://localhost:3000/api/passenger-addresses');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      set({ addresses: data, loading: false });
    } catch (err) {
      console.error('Error fetching addresses:', err);
      set({ error: err.message, loading: false });
    }
  },

  // Yeni adres ekleme
  createAddress: async (addressData) => {
    // addressData: { YolcuID, AdresSatiri1, AdresSatiri2, SehirID, PostaKodu, UlkeID }
    try {
      const response = await fetch('http://localhost:3000/api/passenger-addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addressData),
      });
      if (!response.ok) {
        throw new Error('Failed to create address');
      }
      // Adres eklendikten sonra tekrar fetch
      await response.text(); 
      await usePassengerAddressStoreNew.getState().fetchAddresses();

      return true;
    } catch (err) {
      console.error('Error creating address:', err);
      return false;
    }
  },
}));

export default usePassengerAddressStoreNew;
