import Router from 'express';
import admin from '../controllers/adminController.js'
const router = Router();


router.get('/', admin.getAdmin)
router.get('/:id', admin.getAdminAll);
router.post('/', admin.createAdmin);
router.put("/:id", admin.updateAdmin);
router.delete('/:id', admin.deleteAdmin);

export default router;