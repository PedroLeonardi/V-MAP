import express from 'express'
import mapa from '../controllers/mapaController.js'
const router = express.Router()

router.get('/:id', mapa.readCordenadas)

router.options('/' , (req, res) => {
    res.setHeader('Allow', 'GET');
    res.status(204).send();
})

export default router