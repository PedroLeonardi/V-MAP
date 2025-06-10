import express from "express"
import adminRoutes from './router/adminRoute.js'
import alunoRoute from './router/alunoRoute.js'
import responsavelRoute from './router/responsavelRoute.js'
import authRoute from './router/authRoute.js'
import motoristas from './router/motoristaRoute.js'
import veiculoRoute from './router/veiculoRoute.js'
import contatoRoute from './router/contatoRoute.js'
import rotaRouter from './router/rotaRoute.js'
import mapaRouter from './router/mapaRoute.js'
import log from "./router/logRoute.js"
import cors from 'cors';

import logger from "./logs/logger.js"

const app = express();
const port = 3001;

app.use((req, res, next) => {
  logger.info(`Acessando: ${req.method} da URL: ${req.originalUrl}`);
  next();
});


// middlewares
app.use(express.json());
app.use(cors())

// rotas
app.get('/', async (req, res) =>{
    res.status(200).json({message: 'Sucesso, Página inicial'})
})
app.use('/admin', adminRoutes);
app.use('/aluno', alunoRoute);
app.use('/responsavel', responsavelRoute)
app.use('/auth', authRoute)
app.use('/motorista', motoristas)
app.use('/veiculo', veiculoRoute)
app.use('/contato', contatoRoute)
app.use('/rota', rotaRouter )
app.use('/mapa', mapaRouter)
app.use('/log', log)

// se caso rota nao existir 
app.use("/", (req,res) => {
    res.status(404).json({message: 'Rota não encontrada'})
})

app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`)
})

export default app