// filepath: /c:/Users/emreh/OneDrive/Masaüstü/travel-guide/travel-guide/frontend/src/store/routeStore.jsx
import { create } from 'zustand';

const useRouteStore = create((set) => ({
  routes: [],
  fetchRoutes: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/routes'); // Tam URL'yi kullanın
      const data = await response.json();
      set({ routes: data });
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  },
  addRoute: (route) => {
    set((state) => ({
      routes: [...state.routes, route],
    }));
  },
  deleteRoute: async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/routes/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        set((state) => ({
          routes: state.routes.filter((route) => route.RotaID !== id),
        }));
      } else {
        console.error('Error deleting route:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting route:', error);
    }
  },
}));

export default useRouteStore;