import express from "express";
import contato from '../controllers/contatoController.js';
const router = express.Router();

router.get('/', contato.readMensage)
router.get('/:status', contato.readMensageByStatus)
router.post('/', contato.sendMensage)
router.put('/:id', contato.updateMensageStatus)

router.options('/' , (req, res) => {
    res.setHeader('Allow', 'GET, POST, PUT');
    res.status(204).send();
})

export default router