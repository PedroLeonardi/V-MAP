import { Router } from 'express';
import { loginAdminController, loginAlunoController, loginResponsavelController } from '../controllers/AuthController.js';

const router = Router();

router.post('/admin/login', loginAdminController);
router.post('/aluno/login', loginAlunoController);
router.post('/responsavel/login', loginResponsavelController);

export default router;
