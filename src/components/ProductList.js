import React, { useState, useEffect } from 'react';

export default function ProductList({ products = [], addToCart = () => {} }) {
  const initialItems = Array.isArray(products) ? products : [];
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    // If products prop is provided and non-empty, use it.
    if (Array.isArray(products) && products.length) {
      setItems(products);
      return;
    }

    // Otherwise fetch from backend API.
    let aborted = false;
    fetch('/api/products')
      .then(res => (res.ok ? res.json() : Promise.reject(res)))
      .then(data => {
        if (aborted) return;
        const arr = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
          ? data.products
          : Array.isArray(data?.data)
          ? data.data
          : [];
        if (arr.length) setItems(arr);
      })
      .catch(() => {
        if (!aborted) setItems([]);
      });

    return () => {
      aborted = true;
    };
  }, [products]);

  return (
    <div>
      <h2>Product Catalog</h2>
      <ul>
        {items.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}