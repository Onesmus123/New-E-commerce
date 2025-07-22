import React from 'react';
import './Handwoven.css';
import { Link } from 'react-router-dom';
import handwovenCarousel from '../Assets/handwoven_carousel.png';

const Handwoven = () => {
  return (
    <div className="handwoven-page">
      <div className="handwoven-carousel-image-wrapper">
        <Link to="/" className="handwoven-home-link">← Home</Link>
        <img
          src={handwovenCarousel}
          alt="Handwoven Carousel"
          className="handwoven-carousel-image"
        />
      </div>

      <h1 className="handwoven-title">Handwoven Products</h1>

      <div className="handwoven-products-grid">
        <div className="handwoven-product-card">
          <img src="https://via.placeholder.com/300x300" alt="Handwoven 1" />
          <h3>Woven Basket</h3>
          <p>$29.99</p>
        </div>
        <div className="handwoven-product-card">
          <img src="https://via.placeholder.com/300x300" alt="Handwoven 2" />
          <h3>Handwoven Rug</h3>
          <p>$59.99</p>
        </div>
        <div className="handwoven-product-card">
          <img src="https://via.placeholder.com/300x300" alt="Handwoven 3" />
          <h3>Decorative Mat</h3>
          <p>$19.99</p>
        </div>
      </div>
    </div>
  );
};

export default Handwoven;
