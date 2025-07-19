import React from 'react';
import './Footwear.css';

const Footwear = () => {
  return (
    <div className="footwear-page">
      <h1>Footwear Collection</h1>
      <div className="products-grid">
        <div className="product-card">
          <img src="https://pixabay.com/photos/fashion-high-heels-shoes-pumps-1284496/" alt="Footwear 1" />
          <h3>Running Shoes</h3>
          <p>$49.99</p>
        </div>
        <div className="product-card">
          <img src="https://www.istockphoto.com/photo/different-female-shoes-abstract-arrangement-on-beige-carpet-flooring-fashion-gm2175079600-594683408?utm_source=pixabay&utm_medium=affiliate&utm_campaign=limited-results_image&utm_content=srp_bottombannerNone_media&utm_term=footware" alt="Footwear 2" />
          <h3>Casual Sneakers</h3>
          <p>$39.99</p>
        </div>
        <div className="product-card">
          <img src="https://via.placeholder.com/300x300" alt="Footwear 3" />
          <h3>Leather Boots</h3>
          <p>$79.99</p>
        </div>
      </div>
    </div>
  );
};

export default Footwear;