import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
function Banner() {
  return <div className='z-0'>
      <Carousel
       autoPlay infiniteLoop
       showArrows={true}
       showIndicators={false}
       showThumbs={false}
       showStatus={false}
       interval={4000}
      >
          <div className=''>

          <img className='h-64  sm:h-72 md:h-80 lg:h-96 xl:h-[500px]' src="https://m.media-amazon.com/images/I/61dmivPGQ8L._SX3000_.jpg" alt="" />
          </div>
          <div>
          <img className='h-64  sm:h-72 md:h-80 lg:h-96 xl:h-[500px]' src="https://m.media-amazon.com/images/I/71qid7QFWJL._SX3000_.jpg" alt="" />
          </div>
          <div>
          <img className='h-64  sm:h-72 md:h-80 lg:h-96 xl:h-[500px]' src="https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg" alt="" />
          </div>
          <div>
          <img className='h-64  sm:h-72 md:h-80 lg:h-96 xl:h-[500px]' src="https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg" alt="" />
          </div>
          <div>
          <img className='h-64  sm:h-72 md:h-80 lg:h-96 xl:h-[500px]' src="https://m.media-amazon.com/images/I/711Y9Al9RNL._SX3000_.jpg" alt="" />
          </div>
      </Carousel>
  </div>;
}

export default Banner;
