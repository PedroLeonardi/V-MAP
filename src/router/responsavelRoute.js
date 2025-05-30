import Router from 'express';
import responsavel from '../controllers/responsavelController.js'
const router  = Router();

router.get('/', responsavel.getResponsavelAllContoller);
router.get("/:id", responsavel.getResponsavelController);
router.get('/cpf/:cpf', responsavel.getResponsavelByCpfController);
router.post('/', responsavel.createResponsavelController);
router.put('/:id', responsavel.updateResponsavelController); 
router.delete('/:id', responsavel.deleteResponsavelController)

export default router;