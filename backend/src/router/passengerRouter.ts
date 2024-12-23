import express from 'express';
import { getAllPassengers, getPassengerById, createPassenger, updatePassenger, deletePassenger } from '../controllers/passengerController';

const router = express.Router();

router.get('/passengers', getAllPassengers);
router.get('/passengers/:id', getPassengerById);
router.post('/passengers', createPassenger);
router.put('/passengers/:id', updatePassenger);
router.delete('/passengers/:id', deletePassenger);

export default router;