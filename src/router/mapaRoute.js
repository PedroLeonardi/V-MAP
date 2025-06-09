import express from 'express'
import mapa from '../controllers/mapaController.js'
const router = express.Router()

router.get('/:id', mapa.readCordenadas)

export default router