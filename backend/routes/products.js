import express from 'express';
const router = express.Router();
import products from '../models/product.js';

// GET /api/products
router.get('/', (req, res) => {
  res.json(products);
});

export default router;