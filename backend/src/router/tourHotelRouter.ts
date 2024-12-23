import express from 'express';
import { getAllTourHotels, getTourHotelById, createTourHotel, updateTourHotel, deleteTourHotel } from '../controllers/tourHotelController';

const router = express.Router();

router.get('/tour-hotels', getAllTourHotels);
router.get('/tour-hotels/:tourId/:hotelId', getTourHotelById);
router.post('/tour-hotels', createTourHotel);
router.put('/tour-hotels/:tourId/:hotelId', updateTourHotel);
router.delete('/tour-hotels/:tourId/:hotelId', deleteTourHotel);

export default router;