import Router from 'express';
import rota from '../controllers/routeController.js'
const router = Router();

router.get('/', rota.getRotaController);
router.get('/:id', rota.getRotaByIdController);

router.options('/' , (req, res) => {
    res.setHeader('Allow', 'GET');
    res.status(204).send();
})

export default router;