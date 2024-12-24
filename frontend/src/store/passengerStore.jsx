// src/store/passengerStoreNew.jsx
import { create } from 'zustand';

const usePassengerStoreNew = create((set) => ({
  passengers: [],
  loading: false,
  error: null,

  // Tüm yolcuları getir
  fetchPassengers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('http://localhost:3000/api/passengers');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      set({ passengers: data, loading: false });
    } catch (err) {
      console.error('Error fetching passengers:', err);
      set({ error: err.message, loading: false });
    }
  },

  // Yeni yolcu ekle (POST)
  createPassenger: async (passengerData) => {
    // passengerData: { Ad, Soyad, Email, Telefon, Cinsiyet, DogumTarihi, PasaportNo, UlkeID }
    try {
      const response = await fetch('http://localhost:3000/api/passengers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passengerData),
      });

      if (!response.ok) {
        throw new Error('Failed to create passenger');
      }

   
      await response.text(); // veya response.json() (metin döndüğü için text())
      
      // Yolcu listeyi tekrar çek
      set((state) => ({ ...state }));
      await usePassengerStoreNew.getState().fetchPassengers();

      return true; // başarılı
    } catch (err) {
      console.error('Error creating passenger:', err);
      return false; // hata
    }
  },

  // Yolcu silme
  deletePassenger: async (YolcuID) => {
    try {
      const response = await fetch(`http://localhost:3000/api/passengers/${YolcuID}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete passenger');
      }
      // Başarılıysa local state'i güncelle
      set((state) => ({
        passengers: state.passengers.filter((p) => p.YolcuID !== YolcuID),
      }));
      return true;
    } catch (err) {
      console.error('Error deleting passenger:', err);
      return false;
    }
  },
}));

export default usePassengerStoreNew;
