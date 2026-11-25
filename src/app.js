import express from 'express';
import ongRoutes from './routes/ongRoutes.js';
import petRoutes from './routes/petRoutes.js';
import cors from 'cors';

const app = express();

// Permite que o Express entenda requisições com corpo em JSON
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/ongs', ongRoutes);
app.use('/pets', petRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Adoção de Pets funcionando!' });
});

export default app;