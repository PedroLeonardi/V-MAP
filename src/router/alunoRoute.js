import Router from 'express';
import aluno from "../controllers/alunoController.js"

const router = Router();

router.get('/',  aluno.getAlunoAll);
router.get('/total', aluno.getTotalAlunos); 
router.get('/:id', aluno.getAluno);
router.post('/', aluno.createAluno);

export default router;
