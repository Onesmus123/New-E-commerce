import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './Footwear.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import footwear_carousel from '../Assets/footwear_carousel.png';

const Footwear = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="footwear-page">
      <Slider {...settings}>
        <div className="footwear-carousel-slide">
          <div className="carousel-image-wrapper">
            <Link to="/" className="home-link">← Home</Link>
            <img
              src={footwear_carousel}
              alt="Footwear Banner"
              className="footwear-carousel-image"
            />
          </div>
        </div>
      </Slider>

      <h1>Footwear Collection</h1>

      <div className="products-grid">
        <div className="product-card">
          <img src="https://via.placeholder.com/300x300" alt="Footwear 1" />
          <h3>Running Shoes</h3>
          <p>$49.99</p>
        </div>
        <div className="product-card">
          <img src="https://via.placeholder.com/300x300" alt="Footwear 2" />
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
