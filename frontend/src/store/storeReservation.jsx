import { create } from 'zustand';

const useReservationStore = create((set) => ({
  reservations: [],
  createReservation: async (YolcuID, TurID) => {
    try {
      const response = await fetch('http://localhost:3000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ YolcuID, TurID }),
      });
      if (response.ok) {
        const newReservation = await response.json();
        set((state) => ({
          reservations: [...state.reservations, newReservation],
        }));
      } else {
        console.error('Error creating reservation:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  },
}));

export default useReservationStore;