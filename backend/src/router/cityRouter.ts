import express from 'express';
import { getAllCities, getCityById, createCity, updateCity, deleteCity } from '../controllers/cityController';

const router = express.Router();

router.get('/cities', getAllCities);
router.get('/cities/:id', getCityById);
router.post('/cities', createCity);
router.put('/cities/:id', updateCity);
router.delete('/cities/:id', deleteCity);

export default router;