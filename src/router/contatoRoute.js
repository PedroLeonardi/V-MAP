import express from "express";
import contato from '../controllers/contatoController.js';
const router = express.Router();

router.get('/', contato.readMensage)
router.get('/:status', contato.readMensageByStatus)
router.post('/', contato.sendMensage)
router.put('/:id', contato.updateMensageStatus)

export default router