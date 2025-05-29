import Router from 'express';
import aluno from "../controllers/alunoController.js"

const router = Router();

router.get('/', aluno.getAlunoAllController);
router.get('/:id', aluno.getAlunoController);
router.get('/cpf/:cpf', aluno.getAlunoByCpfController)
router.put('/:id', aluno.updateAlunoController);
router.post('/', aluno.createAlunoController);
router.delete('/:id', aluno.deleteAlunoController); 

export default router;
