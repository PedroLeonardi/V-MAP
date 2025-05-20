import express from "express";
import admin from "../controllers/adminController.js"
const router = express.Router();

router.use(express.json())

router.get("/", admin.getAdminAll)
router.get("/:id", admin.getAdmin)

export default router;