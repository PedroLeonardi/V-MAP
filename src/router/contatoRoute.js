import express from "express";
import contato from '../controllers/contatoController.js';
const router = express.Router();

router.get('/', contato.readMensage)
router.post('/', contato.sendMensage)
router.get('/:status', contato.readMensageByStatus)
router.put('/:id', contato.updateMensageStatus)

export default router