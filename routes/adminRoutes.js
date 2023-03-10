import { Router } from 'express';
import authController from '../api/authController.js';
import slotsController from '../api/slotsController.js';
const router = Router();



router.post('/addSlots',slotsController.addSlots)
router.post('/updateSlots',slotsController.updateSlots)
router.delete('/deleteSlots',slotsController.deleteSlots)

export default router;