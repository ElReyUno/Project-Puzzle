# Task 003: Implement Product CRUD API Endpoints

## Task Description

This task extends the backend API to support full CRUD operations for products in the e-commerce platform. Implement GET, POST, PUT, and DELETE endpoints for /api/products with input validation, error handling, and in-memory persistence using the existing Express setup.

### Endpoints Added

- **GET /api/products/:id:** Retrieves a single product by ID (404 if not found).
- **POST /api/products:** Creates a new product (requires name and price; validates price > 0; auto-assigns ID).
- **PUT /api/products/:id:** Updates an existing product (validates fields; 404 if not found).
- **DELETE /api/products/:id:** Removes a product (404 if not found).

### Acceptance Criteria

- All endpoints functional with proper RESTful responses.
- Input validation for name (string) and price (positive number).
- Error responses: 400 for invalid input, 404 for not found.
- In-memory storage extended without external dependencies.
- Tests pass locally and in Docker.

### Technology

- **Express.js** for routing
- **Jest** for testing
- **Supertest** for API testing

### File Count Target

- 2+ files modified (routes/products.js, models/product.js if needed).

### Test Framework

- Jest (validates CRUD operations, validation, errors).