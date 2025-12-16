import { useState } from 'react';

interface ImageDisplayProps {
  src: string;
  alt: string;
  onLoad: () => void;
  onError: () => void;
  fadeOut?: boolean;
}

const ImageDisplay = ({ src, alt, onLoad, onError, fadeOut = false }: ImageDisplayProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError();
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      {/* Loading State */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/40 text-sm">Loading image...</p>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/60 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16 mx-auto mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        loading="eager"
        decoding="async"
        fetchpriority="high"
        className={`max-w-full max-h-full w-auto h-auto object-contain carousel-transition gpu-accelerated ${
          isLoading || hasError || fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};

export default ImageDisplay;
