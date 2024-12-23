import { create } from 'zustand';

const usePlaneStore = create((set) => ({
  planes: [],
  fetchPlanes: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/planes'); // Tam URL'yi kullanın
      const data = await response.json();
      set({ planes: data });
    } catch (error) {
      console.error('Error fetching planes:', error);
    }
  },
  addPlane: (plane) => {
    set((state) => ({
      planes: [...state.planes, plane],
    }));
  },
  deletePlane: async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/planes/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        set((state) => ({
          planes: state.planes.filter((plane) => plane.UcakID !== id),
        }));
      } else {
        console.error('Error deleting plane:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting plane:', error);
    }
  },
}));

export default usePlaneStore;