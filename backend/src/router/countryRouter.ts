import express, { Router } from 'express';
import { getAllCountries, getCountryById, createCountry, updateCountry, deleteCountry } from '../controllers/countryController';

const router: Router = express.Router();

// Tüm ülkeleri getir
router.get('/countries', getAllCountries);

// Belirli bir ülkeyi ID ile getir
router.get('/countries/:id', getCountryById);

// Yeni bir ülke oluştur
router.post('/countries', createCountry);

// Belirli bir ülkeyi ID ile güncelle
router.put('/countries/:id', updateCountry);

// Belirli bir ülkeyi ID ile sil
router.delete('/countries/:id', deleteCountry);

export default router;
