import { Router } from 'express';
import { loginAdminController, loginAlunoController, loginResponsavelController } from '../controllers/AuthController.js';

const router = Router();

router.post('/admin/login', loginAdminController);
router.post('/aluno/login', loginAlunoController);
router.post('/responsavel/login', loginResponsavelController);

router.options('/' , (req, res) => {
    res.setHeader('Allow', 'POST');
    res.status(204).send();
})

export default router;
