import Router from 'express';
import responsavel from '../controllers/responsavelController.js'
const router  = Router();

router.get('/', responsavel.getResponsavelAll);
router.get("/:id", responsavel.getResponsavel);
router.get('/cpf/:cpf', responsavel.getResponsavelByCPF);
router.post('/', responsavel.createResponsavel);
router.put('/:id', responsavel.updateResponsavel); 
router.delete('/:id', responsavel.deleteResponsavel)

export default router;