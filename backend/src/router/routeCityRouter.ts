import express from 'express';
import { getAllRouteCities, getRouteCityById, createRouteCity, updateRouteCity, deleteRouteCity } from '../controllers/routeCityController';

const router = express.Router();

router.get('/route-cities', getAllRouteCities);
router.get('/route-cities/:routeId/:cityId', getRouteCityById);
router.post('/route-cities', createRouteCity);
router.put('/route-cities/:routeId/:cityId', updateRouteCity);
router.delete('/route-cities/:routeId/:cityId', deleteRouteCity);

export default router;