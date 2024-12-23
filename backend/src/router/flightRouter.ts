import express from 'express';
import { getAllFlights, getFlightById, createFlight, updateFlight, deleteFlight } from '../controllers/flightController';

const router = express.Router();

router.get('/flights', getAllFlights);
router.get('/flights/:id', getFlightById);
router.post('/flights', createFlight);
router.put('/flights/:id', updateFlight);
router.delete('/flights/:id', deleteFlight);

export default router;