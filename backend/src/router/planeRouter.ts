import express from 'express';
import { getAllPlanes, getPlaneById, createPlane, updatePlane, deletePlane } from '../controllers/planeController';

const router = express.Router();

router.get('/planes', getAllPlanes);
router.get('/planes/:id', getPlaneById);
router.post('/planes', createPlane);
router.put('/planes/:id', updatePlane);
router.delete('/planes/:id', deletePlane);

export default router;