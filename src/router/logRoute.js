import express from "express";
import log from '../controllers/logController.js';
const router = express.Router();

router.post('/onibus', log.sendLonOnibus)


export default router