import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { loadImages } from '../utils/imageLoader';

const Gallery = () => {
  const images = loadImages();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-4 tracking-wide">Gallery</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore our collection of beautiful moments captured through our lens
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden cursor-pointer group aspect-[3/4]"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image}
              alt={`Wedding photography ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}
        </div>
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:opacity-70 transition-opacity z-10"
          >
            <X size={32} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 text-white hover:opacity-70 transition-opacity z-10"
          >
            <ChevronLeft size={40} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-6 text-white hover:opacity-70 transition-opacity z-10"
          >
            <ChevronRight size={40} />
          </button>

          <div className="max-w-5xl max-h-[90vh] px-4">
            <img
              src={images[currentImageIndex]}
              alt={`Wedding photography ${currentImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm font-light tracking-wider">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
