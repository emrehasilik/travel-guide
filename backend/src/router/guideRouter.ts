import express from 'express';
import { getAllGuides, getGuideById, createGuide, updateGuide, deleteGuide } from '../controllers/guideController';

const router = express.Router();

router.get('/guides', getAllGuides);
router.get('/guides/:id', getGuideById);
router.post('/guides', createGuide);
router.put('/guides/:id', updateGuide);
router.delete('/guides/:id', deleteGuide);

export default router;