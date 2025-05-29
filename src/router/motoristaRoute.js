import express from "express"
import motorista from "../controllers/motoristaController.js"

const router = express.Router()

router.get('/', motorista.getMotoristaAll);
router.get('/cpf/:cpf', motorista.getMotoristaByCpfController)
router.post('/', motorista.createMotorista);
router.delete('/id', motorista.deleteMotorista)

export default router;

