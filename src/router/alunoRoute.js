import Router from 'express';
import aluno from "../controllers/alunoController.js"

const router = Router();

router.get('/', aluno.getAlunoAll);
router.get('/cpf/:cpf', aluno.getAlunoByCPF);
router.get('/total', aluno.getTotalAlunos);
router.get('/:id', aluno.getAluno);
router.put('/:id', aluno.updateAluno);
router.post('/', aluno.createAluno);
router.delete('/:id', aluno.deleteAluno); 

export default router;
