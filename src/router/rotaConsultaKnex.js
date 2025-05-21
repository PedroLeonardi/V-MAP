import express from "express";
import admin from "../controllers/adminController.js"
import aluno from "../controllers/alunoController.js"
import motorista from "../controllers/motoristaController.js"
import responsavel from "../controllers/responsavelController.js"
const router = express.Router();

router.use(express.json())

router.get("/admin", admin.getAdminAll)
router.get("/admin/:id", admin.getAdmin)
router.post("/admin", admin.createAdmin)
router.delete("/admin/:id", admin.deleteAdmin)
router.put("/admin/:id", admin.updateAdmin)

router.get("/aluno", aluno.getAlunoAll)
router.get("/aluno/:id", aluno.getAluno)

router.post("/respon", responsavel.createResponsavel)
router.get("/respon", responsavel.getResponsavelAll)
// router.get("/motorista", motorista.getMotoristaAll)

export default router;