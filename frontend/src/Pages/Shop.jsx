import React from 'react';
import Carousel from '../Components/Carousel/Carousel';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';
import './CSS/Shop.css'; // Add this file to manage spacing & layout if needed

const Shop = () => {
  return (
    <div className="shop-container">
      <Carousel />

      <section className="shop-section">
        <Popular />
      </section>

      <section className="shop-section">
        <Offers />
      </section>

      <section className="shop-section">
        <NewCollections />
      </section>

      <section className="shop-section">
        <NewsLetter />
      </section>
    </div>
  );
};

export default Shop;
