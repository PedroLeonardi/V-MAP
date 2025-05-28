// src/routes/adminRoutes.js
import { Router } from 'express';
import admin from '../controllers/adminController.js';

const router = Router();

router.get('/', admin.getAdminAll);       
router.get('/:id', admin.getAdmin);      
router.post('/', admin.createAdmin);       
router.put('/:id', admin.updateAdmin);     
router.delete('/:id', admin.deleteAdmin); 
router.get('/cpf/:cpf', admin.getAdmByCPF);

export default router;
