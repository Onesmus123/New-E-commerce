import React from 'react';
import Slider from 'react-slick';
import './Carousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import carousel1 from '../Assets/carousel1.png';
import carousel2 from '../Assets/carousel2.png';
import carousel3 from '../Assets/carousel3.png';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  autoplaySpeed: 2000,
    appendDots: dots => (
      <div>
        <ul style={{ margin: '0px', padding: '0px' }}>{dots}</ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, slidesToScroll: 1, dots: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const slides = [
    {
      src: carousel1,
      alt: 'Slide 1',
    },
    {
      src: carousel2,
      alt: 'Slide 2',
    },
    {
      src: carousel3,
      alt: 'Slide 3',
    },
  ];

  return (
    <div className="full-width-carousel" role="region" aria-label="Promotional carousel">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div className="full-width-slide" key={index}>
            <img src={slide.src} alt={slide.alt} className="slide-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
