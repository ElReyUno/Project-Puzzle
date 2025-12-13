import React from 'react';

export default function ShoppingCart({ cart = [] }) {
  if (!cart || cart.length === 0) {
    return <div>Your cart is empty</div>;
  }
  return (
    <ul>
      {cart.map((item, idx) => (
        <li key={item.id || idx}>{item.name} x {item.quantity}</li>
      ))}
    </ul>
  );
}