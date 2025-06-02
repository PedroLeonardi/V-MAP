// src/routes/adminRoutes.js
import { Router } from 'express';
import admin from '../controllers/adminController.js';
const router = Router();

router.get('/', admin.getAdminAllController);       
router.get('/:id', admin.getAdminController);   
router.get('/cpf/:cpf', admin.getAdmByCpfController)   
router.post('/', admin.createAdminController);       
router.put('/:id', admin.updateAdminController);     
router.delete('/:id', admin.deleteAdminController); 

export default router;
