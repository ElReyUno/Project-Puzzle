import express from 'express';
const router = express.Router();
import users from '../models/user.js';

// POST /api/users
router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  const user = { id: users.length + 1, email, password };
  users.push(user);
  res.status(201).json(user);
});

// POST /api/users/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ message: 'Login successful', user });
});

export default router;