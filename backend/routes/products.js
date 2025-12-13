import express from 'express';
const router = express.Router();
import products from '../models/product.js';

// Helper: validate product input
function validateProductInput(body) {
  if (typeof body.name !== 'string' || !body.name.trim()) return 'Name is required';
  if (typeof body.price !== 'number' || isNaN(body.price) || body.price <= 0) return 'Price must be a positive number';
  return null;
}

// GET /api/products
router.get('/', (req, res) => {
  res.json(products);
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// POST /api/products
router.post('/', (req, res) => {
  const error = validateProductInput(req.body);
  if (error) return res.status(400).json({ error });
  // Auto-increment ID
  const maxId = products.length ? Math.max(...products.map(p => p.id)) : 0;
  const newProduct = {
    id: maxId + 1,
    name: req.body.name,
    price: req.body.price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const error = validateProductInput(req.body);
  if (error) return res.status(400).json({ error });
  product.name = req.body.name;
  product.price = req.body.price;
  res.json(product);
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products.splice(idx, 1);
  res.status(200).json({ message: 'Product deleted' });
});

export default router;