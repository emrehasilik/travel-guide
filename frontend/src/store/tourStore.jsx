import { create } from 'zustand';

const useTourStore = create((set) => ({
  // State tanımları
  tours: [],
  routes: [],
  guides: [],
  planes: [],

  // Tüm turları çekme
  fetchTours: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tours');
      const data = await response.json();
      set({ tours: data });
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  },

  // Tüm rotaları çekme
  fetchRoutes: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/routes');
      const data = await response.json();
      set({ routes: data });
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  },

  // Tüm rehberleri çekme
  fetchGuides: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/guides');
      const data = await response.json();
      set({ guides: data });
    } catch (error) {
      console.error('Error fetching guides:', error);
    }
  },

  // Tüm uçakları çekme
  fetchPlanes: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/planes');
      const data = await response.json();
      set({ planes: data });
    } catch (error) {
      console.error('Error fetching planes:', error);
    }
  },

  // Tur güncelleme
  updateTour: async (tour) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tours/${tour.TurID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tour),
      });
      if (response.ok) {
        const updatedTour = await response.json();
        set((state) => ({
          tours: state.tours.map((t) => (t.TurID === updatedTour.TurID ? updatedTour : t)),
        }));
      } else {
        console.error('Error updating tour:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating tour:', error);
    }
  },

  // Tur silme
  deleteTour: async (tourId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tours/${tourId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        set((state) => ({
          tours: state.tours.filter((t) => t.TurID !== tourId),
        }));
      } else {
        console.error('Error deleting tour:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  },

  // Yeni tur ekleme
  createTour: async (newTour) => {
    try {
      const response = await fetch('http://localhost:3000/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTour),
      });
      if (response.ok) {
        const createdTour = await response.json();
        set((state) => ({
          tours: [...state.tours, createdTour],
        }));
      } else {
        console.error('Error creating tour:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating tour:', error);
    }
  },
}));

export default useTourStore;
