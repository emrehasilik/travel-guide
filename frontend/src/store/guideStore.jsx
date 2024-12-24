import { create } from 'zustand';

const useGuideStore = create((set) => ({
  guides: [],
  fetchGuides: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/guides');
      const data = await response.json();
      set({ guides: data });
    } catch (error) {
      console.error('Error fetching guides:', error);
    }
  },
  addGuide: async (guide) => {
    try {
      const response = await fetch('http://localhost:3000/api/guides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guide),
      });
      if (response.ok) {
        const newGuide = await response.json();
        set((state) => ({
          guides: [...state.guides, newGuide],
        }));
      } else {
        console.error('Error adding guide:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding guide:', error);
    }
  },
  updateGuide: async (guide) => {
    try {
      const response = await fetch(`http://localhost:3000/api/guides/${guide.RehberID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guide),
      });
      if (response.ok) {
        const updatedGuide = await response.json();
        set((state) => ({
          guides: state.guides.map((g) => (g.RehberID === updatedGuide.RehberID ? updatedGuide : g)),
        }));
      } else {
        console.error('Error updating guide:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating guide:', error);
    }
  },
  deleteGuide: async (RehberID) => {
    try {
      const response = await fetch(`http://localhost:3000/api/guides/${RehberID}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        set((state) => ({
          guides: state.guides.filter((guide) => guide.RehberID !== RehberID),
        }));
      } else {
        console.error('Error deleting guide:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting guide:', error);
    }
  },
}));

export default useGuideStore;