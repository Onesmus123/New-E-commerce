import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/zimy_logo.jpg';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = isScrolled ? 'navbar navbar-active' : 'navbar';

  return (
    <div className={navClass}>
      {/* Mobile Hamburger Icon - Only visible on mobile */}
      <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? (
          <i className="fas fa-times"></i>
        ) : (
          <i className="fas fa-bars"></i>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/footwear">Footwear</Link>
          <div
            className={`dropdown ${showDropdown ? 'open' : ''}`}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span>Clothing ⌄</span>
            <div className="dropdown-content">
              <Link to="/mens">Mens</Link>
              <Link to="/womens">Womens</Link>
              <Link to="/kids">Kids</Link>
            </div>
          </div>
          <Link to="/handwoven">Handwoven Products</Link>
        </div>

        {/* Brand Center */}
        <div className="nav-center">
          <Link to="/" className="brand-text">
            Zimy
            <img src={logo} alt="Zimy Logo" className="brand-logo" />
            Afrika
          </Link>
        </div>

        <div className="nav-right">
          <Link to="/our-story">Our Story</Link>
          <Link to="/our-store">Our Store</Link>
          <Link to="/search"><i className="fas fa-search icon-btn" /></Link>
          <Link to="/login"><i className="fas fa-user icon-btn" /></Link>
          <Link to="/cart" className="cart-icon">
            <img src={cart_icon} alt="Cart" />
            <div className="nav-cart-count">{getTotalCartItems()}</div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-nav-links">
            <Link to="/footwear" onClick={() => setMobileMenuOpen(false)}>Footwear</Link>
            <div className="mobile-dropdown" onClick={() => setShowDropdown(!showDropdown)}>
              <span>Clothing ⌄</span>
              <div className={`mobile-dropdown-content ${showDropdown ? 'show' : ''}`}>
                <Link to="/mens" onClick={() => setMobileMenuOpen(false)}>Mens</Link>
                <Link to="/womens" onClick={() => setMobileMenuOpen(false)}>Womens</Link>
                <Link to="/kids" onClick={() => setMobileMenuOpen(false)}>Kids</Link>
              </div>
            </div>
            <Link to="/handwoven" onClick={() => setMobileMenuOpen(false)}>Handwoven Products</Link>
            <Link to="/our-story" onClick={() => setMobileMenuOpen(false)}>Our Story</Link>
            <Link to="/our-store" onClick={() => setMobileMenuOpen(false)}>Our Store</Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Account</Link>
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="mobile-cart-link">
              Cart ({getTotalCartItems()})
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;