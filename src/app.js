import express from "express"
import rotaKnex from "./router/rotaConsultaKnex.js"
const app = express();
const port = 3000;

app.get('/', async (req, res) =>{
    res.status(200).send("Sucesso pagina inical")
})

app.use("/knex", rotaKnex)

app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`)
})