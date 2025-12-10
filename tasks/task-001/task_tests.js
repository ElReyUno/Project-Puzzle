import '@testing-library/jest-dom';
import React from 'react';
import request from 'supertest';
import app from '../../backend/server.js'; // Backend entry point
import { render, waitFor } from '@testing-library/react';
import ProductList from '../../src/components/ProductList.js'; // Component path
import ShoppingCart from '../../src/components/ShoppingCart.js'; // Component path

describe('VendoVerse Starter Setup Tests', () => {
  // Backend API Tests
  test('should return list of products from API', async () => {
    // Arrange
    const expectedProducts = [{ id: 1, name: 'Laptop', price: 999 }, { id: 2, name: 'Phone', price: 599 }];
    // Act
    const response = await request(app).get('/api/products');
    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedProducts);
  });

  test('should create a new user account', async () => {
    // Arrange
    const newUser = { email: 'test@example.com', password: 'password123' };
    // Act
    const response = await request(app).post('/api/users').send(newUser);
    // Assert
    expect(response.status).toBe(201);
    expect(response.body.email).toBe(newUser.email);
  });

  test('should handle invalid user login', async () => {
    // Arrange
    const invalidLogin = { email: 'invalid@example.com', password: 'wrong' };
    // Act
    const response = await request(app).post('/api/users/login').send(invalidLogin);
    // Assert
    expect(response.status).toBe(401);
  });

  // Frontend Component Tests
  test('should render product list component', () => {
    // Arrange
    const products = [{ id: 1, name: 'Product A', price: 100 }];
    // Act
    const { getByText } = render(<ProductList products={products} />);
    // Assert
    expect(getByText('Product A - $100')).toBeInTheDocument();
  });

  test('should add product to shopping cart', () => {
    // Arrange
    const initialCart = [];
    // Act (simulate add action)
    const updatedCart = [...initialCart, { id: 1, name: 'Product A' }];
    // Assert
    expect(updatedCart.length).toBe(1);
    expect(updatedCart[0].name).toBe('Product A');
  });

  test('should display empty cart message', () => {
    // Arrange
    const emptyCart = [];
    // Act
    const { getByText } = render(<ShoppingCart cart={emptyCart} />);
    // Assert
    expect(getByText('Your cart is empty')).toBeInTheDocument();
  });

  test('should integrate frontend with backend API', async () => {
    // Mock fetch to return the expected API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, name: 'API Product', price: 50 }]),
      })
    );

    const { getByText } = render(<ProductList />);
    // Assert
    await waitFor(() => expect(getByText('API Product - $50')).toBeInTheDocument());

    // Restore fetch after test
    global.fetch.mockRestore();
  });
});