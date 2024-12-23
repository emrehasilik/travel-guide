import express from 'express';
import { getAllTours, getTourById, createTour, updateTour, deleteTour } from '../controllers/tourController';

const router = express.Router();

router.get('/tours', getAllTours);
router.get('/tours/:id', getTourById);
router.post('/tours', createTour);
router.put('/tours/:id', updateTour);
router.delete('/tours/:id', deleteTour);

export default router;