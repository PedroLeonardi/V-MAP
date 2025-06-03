import express from 'express'
import mapa from '../controllers/mapaController.js'
const router = express.Router()

router.get('/', mapa.readCordenadas)

export default router