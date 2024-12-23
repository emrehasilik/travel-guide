import express from 'express';
import { getAllRoutes, getRouteById, createRoute, updateRoute, deleteRoute } from '../controllers/routeController';

const router = express.Router();

router.get('/routes', getAllRoutes);
router.get('/routes/:id', getRouteById);
router.post('/routes', createRoute);
router.put('/routes/:id', updateRoute);
router.delete('/routes/:id', deleteRoute);

export default router;