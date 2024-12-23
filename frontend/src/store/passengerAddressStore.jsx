import { create } from 'zustand';

const usePassengerAddressStore = create((set) => ({
  addresses: [],
  addAddress: async (YolcuID, AdresSatiri1, AdresSatiri2, SehirID, PostaKodu, UlkeID) => {
    try {
      const response = await fetch('http://localhost:3000/api/passengerAddresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ YolcuID, AdresSatiri1, AdresSatiri2, SehirID, PostaKodu, UlkeID }),
      });
      if (response.ok) {
        const newAddress = await response.json();
        set((state) => ({
          addresses: [...state.addresses, newAddress],
        }));
      } else {
        console.error('Error adding address:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }
  },
}));

export default usePassengerAddressStore;