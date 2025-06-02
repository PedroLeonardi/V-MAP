import Router from 'express';
import rota from '../controllers/routeController.js'
const router = Router();

router.get('/', rota.getRotaController);
router.get('/:id', rota.getRotaByIdController);

export default router;