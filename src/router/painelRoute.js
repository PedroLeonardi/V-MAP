import { Router } from 'express';
import PainelController from '../controllers/painelController.js'

const router = Router();

router.get('/', PainelController.getAll);
router.get('/filtros', PainelController.getWithFilters);

router.options('/' , (req, res) => {
    res.setHeader('Allow', 'GET');
    res.status(204).send();
})

export default router;