import express from 'express';
import path from 'path';
const app = express();
const rootDir = process.cwd();

app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(rootDir, 'build')));

// Routes
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Catch all handler: send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(rootDir, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
// Only start server if this file is executed directly (not being imported in tests)
if (process.argv[1] === __filename) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;