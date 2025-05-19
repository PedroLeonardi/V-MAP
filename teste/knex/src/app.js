import express from "express";
import userRouter from './routes/userRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send("pagina inicial");
});

app.use('/users', userRouter);

app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
