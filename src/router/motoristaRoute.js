import express from "express"
import motorista from "../controllers/motoristaController.js"

const router = express.Router()

router.get('/', motorista.getMotoristaAll);
router.post('/', motorista.createMotorista);

export default router;

