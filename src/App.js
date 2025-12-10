import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList.js';
import ShoppingCart from './components/ShoppingCart.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import { fetchProducts } from './utils/api.js';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [view, setView] = useState('products'); // 'products', 'login', 'signup'

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setView('products');
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setView('products');
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
  };

  return (
    <div className="App">
      <h1>VendoVerse E-commerce</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleLogout}>Logout</button>
          <ProductList products={products} addToCart={addToCart} />
          <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
        </div>
      ) : (
        <div>
          <button onClick={() => setView('login')}>Login</button>
          <button onClick={() => setView('signup')}>Signup</button>
          {view === 'login' && <Login onLogin={handleLogin} />}
          {view === 'signup' && <Signup onSignup={handleSignup} />}
        </div>
      )}
    </div>
  );
}

export default App;