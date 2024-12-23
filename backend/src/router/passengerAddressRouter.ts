import express from 'express';
import { getAllPassengerAddresses, getPassengerAddressById, createPassengerAddress, updatePassengerAddress, deletePassengerAddress } from '../controllers/passengerAddressController';

const router = express.Router();

router.get('/passenger-addresses', getAllPassengerAddresses);
router.get('/passenger-addresses/:id', getPassengerAddressById);
router.post('/passenger-addresses', createPassengerAddress);
router.put('/passenger-addresses/:id', updatePassengerAddress);
router.delete('/passenger-addresses/:id', deletePassengerAddress);

export default router;