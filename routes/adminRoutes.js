import { Router } from 'express';
import controller from '../api/controller.js';
const router = Router();

router.post('/centerRegister',controller.centerRegister)



export default router;