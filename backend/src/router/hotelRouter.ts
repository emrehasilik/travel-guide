import express from 'express';
import { getAllHotels, getHotelById, createHotel, updateHotel, deleteHotel } from '../controllers/hotelController';

const router = express.Router();

router.get('/hotels', getAllHotels);
router.get('/hotels/:id', getHotelById);
router.post('/hotels', createHotel);
router.put('/hotels/:id', updateHotel);
router.delete('/hotels/:id', deleteHotel);

export default router;