const express = require('express');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const User    = require('../../models/User');  

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'uma-chave-secreta-de-teste';

router.post('/register', async (req, res) => {
  const { username, password, role, sector } = req.body;
  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ error: 'username, password e role são obrigatórios' });
  }
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      passwordHash,
      role,
      sector: role === 'Supervisor' ? sector : null
    });
    await user.save();
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    console.error('Erro no register:', err);
    res.status(409).json({ error: 'Usuário já existe' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'username e password são obrigatórios' });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({
      sub:    user._id,
      username: user.username,
      role:   user.role,
      sector: user.sector
    }, JWT_SECRET, { expiresIn: '8h' });

    res.json({ token });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro interno' });
  }
});

const { authenticate, authorize } = require('../../middlewares/auth');
router.get(
  '/',
  authenticate,
  authorize(['Gerente']),
  async (_req, res) => {
    try {
      const users = await User.find({}, 'username role sector').lean();
      res.json(users);
    } catch (err) {
      console.error('Erro ao listar usuários:', err);
      res.status(500).json({ error: 'Erro interno' });
    }
  }
);

module.exports = router;
