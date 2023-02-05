import { Router } from 'express';
import controller from '../api/controller.js';
const router = Router();

router.get('/centerLogin',controller.centerLogin)
router.post('/updateSlots',controller.updateSlots)


export default router;