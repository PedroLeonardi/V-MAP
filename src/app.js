import express from "express"
import adminRoutes from './router/adminRoute.js'
import alunoRoute from './router/alunoRoute.js'
import responsavelRoute from './router/responsavelRoute.js'
import authRoute from './router/authRoute.js'
import motoristas from './router/motoristaRoute.js'
const app = express();
const port = 3000;

// middlewares
app.use(express.json());

// rotas
app.get('/', async (req, res) =>{
    res.status(200).json({message: 'Sucesso, Página inicial'})
})

app.use('/admin', adminRoutes);
app.use('/aluno', alunoRoute);
app.use('/responsavel', responsavelRoute)
app.use('/auth', authRoute)
app.use('/motorista', motoristas)

app.use("/", (req,res) => {
    res.status(404).json({message: 'Rota não encontrada'})
})



app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`)
})