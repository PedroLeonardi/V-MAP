import Router from 'express';
import veiculo from '../controllers/veiculoController.js'
const router = Router();

router.get('/', veiculo.getVeiculoAll);
router.post('/', veiculo.createVeiculo)

export default router;