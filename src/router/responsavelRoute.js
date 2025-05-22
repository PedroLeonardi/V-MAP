import Router from 'express';
import responsavel from '../controllers/responsavelController.js'
const router  = Router();

router.get('/', responsavel.getResponsavelAll);
router.get("/:id", responsavel.getResponsavel);
router.post('/', responsavel.createResponsavel);

export default router;