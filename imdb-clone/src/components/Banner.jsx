import React, { useState, useEffect } from 'react';

import banner1 from '../images/banner1.jpg';
import banner2 from '../images/banner2.jpg';
import banner3 from '../images/banner3.jpg';
import banner4 from '../images/banner4.jpg';

const bannerMovies = [
  { image: banner1, title: 'Oppenheimer' },
  { image: banner2, title: 'Interstellar' },
  { image: banner3, title: 'The Summer I Turned Pretty' },
  { image: banner4, title: 'Stillwater' }
];

const Banner = () => {
  const [bannerMovie, setBannerMovie] = useState(0);  

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerMovie((prevIndex) => (prevIndex + 1) % bannerMovies.length);
    }, 3000);  
    return () => clearInterval(interval);  
  }, []);

  return (
    <div
      className="relative w-full h-[45vh] md:h-[75vh] bg-cover bg-center flex items-end justify-center"
      style={{
        backgroundImage: `url(${bannerMovies[bannerMovie].image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
        backgroundAttachment: 'fixed', 
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      <div className="relative z-10 text-white text-center w-full text-3xl md:text-5xl font-semibold p-4 px-6 md:p-8">
        {bannerMovies[bannerMovie].title}
      </div>
    </div>
  );
};

export default Banner;
