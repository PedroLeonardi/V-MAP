import { Router } from 'express';
import PainelController from '../controllers/painelController.js'

const router = Router();

router.get('/', PainelController.getAll);
router.get('/filtros', PainelController.getWithFilters);

export default router;