import { create } from 'zustand';

const useGuideStore = create((set) => ({
  guides: [],
  fetchGuides: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/guides'); // Tam URL'yi kullanın
      const data = await response.json();
     
      set({ guides: data });
    } catch (error) {
      console.error('Error fetching guides:', error);
    }
  },
  addGuide: async (Ad, Soyad, Telefon, Email, Cinsiyet, DeneyimYili, Diller) => {
    try {
      const response = await fetch('http://localhost:3000/api/guides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Ad, Soyad, Telefon, Email, Cinsiyet, DeneyimYili, Diller }),
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
  deleteGuide: async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/guides/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        set((state) => ({
          guides: state.guides.filter((guide) => guide.RehberID !== id),
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