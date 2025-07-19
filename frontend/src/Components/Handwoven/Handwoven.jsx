import React from 'react';
import './Handwoven.css';

const Handwoven = () => {
  return (
    <div className="handwoven-page">
      <h1>Handwoven Products</h1>
      <div className="products-grid">
        <div className="product-card">
          <img src="https://via.placeholder.com/300x300" alt="Handwoven 1" />
          <h3>Woven Basket</h3>
          <p>$29.99</p>
        </div>
        <div className="product-card">
          <img src="https://via.placeholder.com/300x300" alt="Handwoven 2" />
          <h3>Handwoven Rug</h3>
          <p>$59.99</p>
        </div>
        <div className="product-card">
          <img src="https://via.placeholder.com/300x300" alt="Handwoven 3" />
          <h3>Decorative Mat</h3>
          <p>$19.99</p>
        </div>
      </div>
    </div>
  );
};

export default Handwoven;