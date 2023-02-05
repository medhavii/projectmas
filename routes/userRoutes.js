import { Router } from 'express';
import controller from '../api/controller.js';
const router = Router();

router.post('/register',controller.register)
router.get('/login',controller.login)
router.get('/centerLogin',controller.centerLogin)
// router.post('/addstudent',controller.addStudent)
// router.delete('/delstudent/:id',controller.deleteByID)


export default router;