import Router from 'express';
import aluno from "../controllers/alunoController.js"

const router = Router();

router.get('/', aluno.getAlunoAllController);
router.get('/:id', aluno.getAlunoController);
router.get('/cpf/:cpf', aluno.getAlunoByCpfController)
router.put('/:id', aluno.updateAlunoController);
router.post('/', aluno.createAlunoController);
router.delete('/:id', aluno.deleteAlunoController); 

router.options('/' , (req, res) => {
    res.setHeader('Allow', 'GET, POST, PUT, DELETE');
    res.status(204).send();
})

export default router;
