import {Router} from 'express';
import veiculo from '../controllers/veiculoController.js'
const router = Router();

router.get('/', veiculo.getVeiculoAll);
router.post('/', veiculo.createVeiculo)

router.options('/' , (req, res) => {
    res.setHeader('Allow', 'GET, POST');
    res.status(204).send();
})

export default router;