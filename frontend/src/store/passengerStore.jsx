import { create } from 'zustand';

const usePassengerStore = create((set) => ({
  passengers: [],
  fetchPassengers: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/passengers'); // Tam URL'yi kullanın
      const data = await response.json();
      set({ passengers: data });
    } catch (error) {
      console.error('Error fetching passengers:', error);
    }
  },
  addPassenger: (passenger) => {
    set((state) => ({
      passengers: [...state.passengers, passenger],
    }));
  },
  deletePassenger: async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/passengers/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        set((state) => ({
          passengers: state.passengers.filter((passenger) => passenger.YolcuID !== id),
        }));
      } else {
        console.error('Error deleting passenger:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting passenger:', error);
    }
  },
}));

export default usePassengerStore;