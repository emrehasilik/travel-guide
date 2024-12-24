import { create } from 'zustand';

const useCityStore = create((set) => ({
  cities: [],
  fetchCities: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/cities'); // Tam URL'yi kullanın
      const data = await response.json();
      set({ cities: data });
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  },
  addCity: async (SehirAdi, UlkeID, SehirKodu, Nufus, Aciklama) => {
    try {
      const response = await fetch('http://localhost:3000/api/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ SehirAdi, UlkeID, SehirKodu, Nufus, Aciklama }),
      });
      if (response.ok) {
        const newCity = await response.json();
        // State'i güncelle
        set((state) => ({
          cities: [...state.cities, newCity], // Yeni şehir ekleniyor
        }));
      } else {
        console.error('Error adding city:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding city:', error);
    }
  },
  
  deleteCity: async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/cities/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        set((state) => ({
          cities: state.cities.filter((city) => city.SehirID !== id),
        }));
      } else {
        console.error('Error deleting city:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  },
}));

export default useCityStore;