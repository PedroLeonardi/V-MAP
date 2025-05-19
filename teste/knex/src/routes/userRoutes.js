import express from 'express';
import UserController from '../Controllers/UserController.js';

const router = express.Router();

// **Aqui os handlers estavam trocados e faltava o '/' no delete**
router.get('/', UserController.getUsers);           // lista todos os usuários
router.get('/:id', UserController.getUser);          // pega um usuário específico pelo id
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);    // faltava o '/' antes do :id

export default router;
