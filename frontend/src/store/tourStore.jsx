import { create } from 'zustand';

const useTourStore = create((set) => ({
  tours: [],
  routes: [],
  guides: [],
  planes: [],
  fetchTours: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tours'); // Tam URL'yi kullanın
      const data = await response.json();
      set({ tours: data });
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  },
  fetchRoutes: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/routes'); // Tam URL'yi kullanın
      const data = await response.json();
      set({ routes: data });
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  },
  fetchGuides: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/guides'); // Tam URL'yi kullanın
      const data = await response.json();
      set({ guides: data });
    } catch (error) {
      console.error('Error fetching guides:', error);
    }
  },
  fetchPlanes: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/planes'); // Tam URL'yi kullanın
      const data = await response.json();
      set({ planes: data });
    } catch (error) {
      console.error('Error fetching planes:', error);
    }
  },
  addTour: async (tour) => {
    try {
      const response = await fetch('http://localhost:3000/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tour),
      });
      if (response.ok) {
        const newTour = await response.json();
        set((state) => ({
          tours: [...state.tours, newTour],
        }));
      } else {
        console.error('Error adding tour:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding tour:', error);
    }
  },
  deleteTour: async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tours/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        set((state) => ({
          tours: state.tours.filter((tour) => tour.TurID !== id),
        }));
      } else {
        console.error('Error deleting tour:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  },
}));

export default useTourStore;