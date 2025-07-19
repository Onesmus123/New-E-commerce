import React from 'react';
import './OurStore.css';

const OurStore = () => {
  return (
    <div className="our-store-page">
      <h1>Our Store Locations</h1>
      <div className="store-list">
        <div className="store-card">
          <h3>Nairobi Store</h3>
          <p>123 Artisan Lane, Nairobi, Kenya</p>
          <p>Phone: +254-712-345-678</p>
          <p>Hours: Mon-Sat 9:00 AM - 6:00 PM</p>
        </div>
        <div className="store-card">
          <h3>Kampala Store</h3>
          <p>456 Craft Road, Kampala, Uganda</p>
          <p>Phone: +256-414-567-890</p>
          <p>Hours: Mon-Sat 9:00 AM - 6:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default OurStore;