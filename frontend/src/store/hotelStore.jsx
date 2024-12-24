import { create } from 'zustand';

const useHotelStore = create((set) => ({
  hotels: [],
  fetchHotels: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/hotels');
      const data = await response.json();
      set({ hotels: data });
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  },
  addHotel: async (hotel) => {
    try {
      const response = await fetch('http://localhost:3000/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotel),
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
  updateHotel: async (hotel) => {
    try {
      const response = await fetch(`http://localhost:3000/api/hotels/${hotel.OtelID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotel),
      });
      if (response.ok) {
        const updatedHotel = await response.json();
        set((state) => ({
          hotels: state.hotels.map((h) => (h.OtelID === updatedHotel.OtelID ? updatedHotel : h)),
        }));
      } else {
        console.error('Error updating hotel:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating hotel:', error);
    }
  },
  deleteHotel: async (OtelID) => {
    try {
      const response = await fetch(`http://localhost:3000/api/hotels/${OtelID}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        set((state) => ({
          hotels: state.hotels.filter((hotel) => hotel.OtelID !== OtelID),
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