import { create } from 'zustand';

const useCountryStore = create((set) => ({
  countries: [],
  fetchCountries: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/countries');
      const data = await response.json();
      set({ countries: data });
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  },
  addCountry: async (UlkeAdi, UlkeKodu, Aciklama) => {
    try {
      const response = await fetch('http://localhost:3000/api/countries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UlkeAdi, UlkeKodu, Aciklama }),
      });
      if (response.ok) {
        const newCountry = await response.json();
        set((state) => ({
          countries: [...state.countries, newCountry],
        }));
      } else {
        console.error('Error adding country:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding country:', error);
    }
  },
  removeCountry: async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/countries/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        set((state) => ({
          countries: state.countries.filter((country) => country.UlkeID !== id),
        }));
      } else {
        console.error('Error removing country:', response.statusText);
      }
    } catch (error) {
      console.error('Error removing country:', error);
    }
  },
}));

export default useCountryStore;