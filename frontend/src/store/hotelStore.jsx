import { create } from 'zustand';

const useHotelStore = create((set) => ({
  hotels: [],
  fetchHotels: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/hotels'); // Tam URL'yi kullanın
      const data = await response.json();
      set({ hotels: data });
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  },
  addHotel: async (OtelAdi, SehirID, YildizSayisi, Aciklama) => {
    try {
      const response = await fetch('http://localhost:3000/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ OtelAdi, SehirID, YildizSayisi, Aciklama }),
      });
      if (response.ok) {
        const newHotel = await response.json();
        set((state) => ({
          hotels: [...state.hotels, newHotel],
        }));
      } else {
        console.error('Error adding hotel:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding hotel:', error);
    }
  },
  deleteHotel: async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/hotels/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        set((state) => ({
          hotels: state.hotels.filter((hotel) => hotel.OtelID !== id),
        }));
      } else {
        console.error('Error deleting hotel:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  },
}));

export default useHotelStore;