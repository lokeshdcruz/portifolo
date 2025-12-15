import { useState, useEffect } from 'react';
import { loadImages } from '../utils/imageLoader';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = loadImages();
  const heroImages = images.slice(0, 5); // Use first 5 images for hero rotation

  useEffect(() => {
    if (heroImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Photography by Lokesh ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 py-20 md:py-32 text-white max-w-7xl">
        <p className="text-sm md:text-base font-light tracking-[0.3em] mb-8 opacity-90 uppercase">
          Stories by Lokesh
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 leading-tight max-w-3xl">
          Because we are all stories
        </h1>
        <p className="text-base md:text-lg font-light max-w-xl leading-relaxed opacity-90 mb-12">
          Capturing real emotions and timeless moments through authentic, cinematic photography. 
          Specializing in couple, engagement, candid, and event photography.
        </p>
        <div>
          <a
            href="https://wa.me/917396412974"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border-2 border-white text-white text-xs font-light tracking-[0.2em] uppercase hover:bg-white hover:text-[#1E1E1E] transition-all"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-16 bg-white opacity-30 animate-pulse"></div>
      </div>
    </section>
  );
};

export default Hero;
