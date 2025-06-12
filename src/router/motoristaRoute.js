import express from "express"
import motorista from "../controllers/motoristaController.js"

const router = express.Router()

router.get('/', motorista.getMotoristaAll);
router.get('/cpf/:cpf', motorista.getMotoristaByCpfController)
router.post('/', motorista.createMotorista);
router.put('/:id', motorista.updateMotorista)
router.delete('/:id', motorista.deleteMotorista)

router.options('/' , (req, res) => {
    res.setHeader('Allow', 'GET, POST, PUT, DELETE');
    res.status(204).send();
})

export default router;

