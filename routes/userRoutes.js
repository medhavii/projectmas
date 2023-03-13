import { Router } from 'express';
import authController from '../api/authController.js';
import bookingController from '../api/bookingController.js';
import slotsController from '../api/slotsController.js';

const router = Router();

router.post('/register',authController.register)
router.get('/login',authController.login)
router.get('/getSlots',slotsController.getSlots)
router.post('/bookSlot',bookingController.bookSlot)
router.delete('/cancelSlot',bookingController.cancelSlot)


export default router;