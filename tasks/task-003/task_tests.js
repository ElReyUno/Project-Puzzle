import request from 'supertest';
import app from '../../backend/server.js';
import products from '../../backend/models/product.js';

describe('Task 003 — Product CRUD API Endpoints', () => {
  beforeEach(() => {
    // Reset products array to initial state for each test
    products.length = 0;
    products.push({ id: 1, name: 'Laptop', price: 999 }, { id: 2, name: 'Phone', price: 599 });
  });

  test('GET /api/products/:id - retrieves existing product', async () => {
    const productId = 1;
    const response = await request(app).get(`/api/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: 'Laptop', price: 999 });
  });

  test('GET /api/products/:id - returns 404 for non-existent product', async () => {
    const productId = 999;
    const response = await request(app).get(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Product not found');
  });

  test('POST /api/products - creates new product successfully', async () => {
    const newProduct = { name: 'Tablet', price: 299 };
    const response = await request(app).post('/api/products').send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id', 3);
    expect(response.body.name).toBe('Tablet');
    expect(response.body.price).toBe(299);
    expect(products).toHaveLength(3);
  });

  test('POST /api/products - returns 400 for invalid data (missing name)', async () => {
    const invalidProduct = { price: 299 };
    const response = await request(app).post('/api/products').send(invalidProduct);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('PUT /api/products/:id - updates existing product', async () => {
    const productId = 1;
    const updateData = { name: 'Gaming Laptop', price: 1299 };
    const response = await request(app).put(`/api/products/${productId}`).send(updateData);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Gaming Laptop');
    expect(products.find(p => p.id === 1).price).toBe(1299);
  });

  test('PUT /api/products/:id - returns 404 for non-existent product', async () => {
    const productId = 999;
    const updateData = { name: 'New Item', price: 100 };
    const response = await request(app).put(`/api/products/${productId}`).send(updateData);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Product not found');
  });

  test('DELETE /api/products/:id - deletes existing product', async () => {
    const productId = 1;
    const response = await request(app).delete(`/api/products/${productId}`);
    expect(response.status).toBe(200);
    expect(products).toHaveLength(1);
    expect(products.find(p => p.id === 1)).toBeUndefined();
  });
});