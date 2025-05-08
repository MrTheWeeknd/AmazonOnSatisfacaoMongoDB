require('dotenv').config({ path: './backend/.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro ao conectar MongoDB:', err));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', socket => {
  console.log('Novo cliente conectado:', socket.id);
});

const responseSchema = new mongoose.Schema({
  setor: String,
  nivel: String,
  observacao: String,
  escolhaCardapio: {
    proteina: String,
    carboidrato: String,
    salada: String,
    sobremesa: String
  },
  data: { type: Date, default: Date.now }
}, { collection: 'satisfacao' });

const Response = mongoose.model('Response', responseSchema);

app.post('/api/satisfacao', async (req, res) => {
  try {
    const resp = new Response(req.body);
    await resp.save();
    io.emit('new-response', resp);
    res.status(201).json(resp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/satisfacao', async (_req, res) => {
  try {
    const all = await Response.find().sort('-data');
    res.json(all);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5500;
server.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
