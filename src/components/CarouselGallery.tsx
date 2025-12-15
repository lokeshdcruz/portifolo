import { useState, useEffect } from 'react';
import { loadImages } from '../utils/imageLoader';
import ImageDisplay from './ImageDisplay';
import NavigationArrows from './NavigationArrows';
import PositionIndicator from './PositionIndicator';

interface CarouselState {
  images: string[];
  currentIndex: number;
  isLoading: boolean;
  error: string | null;
}

const CarouselGallery = () => {
  const [state, setState] = useState<CarouselState>({
    images: [],
    currentIndex: 0,
    isLoading: true,
    error: null,
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Initialize images on mount
  useEffect(() => {
    try {
      const loadedImages = loadImages();
      setState({
        images: loadedImages,
        currentIndex: 0,
        isLoading: false,
        error: loadedImages.length === 0 ? 'No images found in gallery' : null,
      });
    } catch (err) {
      setState({
        images: [],
        currentIndex: 0,
        isLoading: false,
        error: 'Failed to load images',
      });
    }
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle arrow keys
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        // Prevent default browser behavior (scrolling)
        event.preventDefault();

        // Navigate using the same logic as click navigation
        if (event.key === 'ArrowRight') {
          navigateNext();
        } else if (event.key === 'ArrowLeft') {
          navigatePrevious();
        }
      }
    };

    // Add event listener on mount
    window.addEventListener('keydown', handleKeyPress);

    // Remove event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [state.currentIndex, state.images.length, isTransitioning]); // Dependencies for navigation functions

  // Navigate to next image
  const navigateNext = () => {
    if (isTransitioning || state.currentIndex >= state.images.length - 1) {
      return;
    }

    setIsTransitioning(true);
    setFadeOut(true);

    // Wait for fade out animation (300ms)
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
      }));
      setFadeOut(false);
    }, 300);

    // Release transition lock after complete animation (fade out + fade in)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  // Navigate to previous image
  const navigatePrevious = () => {
    if (isTransitioning || state.currentIndex <= 0) {
      return;
    }

    setIsTransitioning(true);
    setFadeOut(true);

    // Wait for fade out animation (300ms)
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex - 1,
      }));
      setFadeOut(false);
    }, 300);

    // Release transition lock after complete animation (fade out + fade in)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  // Calculate navigation availability
  const canGoPrevious = state.currentIndex > 0;
  const canGoNext = state.currentIndex < state.images.length - 1;

  // Preload next and previous images for instant navigation
  useEffect(() => {
    if (state.images.length === 0) return;

    const preloadImages: HTMLImageElement[] = [];

    // Preload next image
    if (state.currentIndex < state.images.length - 1) {
      const nextImg = new Image();
      nextImg.src = state.images[state.currentIndex + 1];
      preloadImages.push(nextImg);
    }

    // Preload previous image
    if (state.currentIndex > 0) {
      const prevImg = new Image();
      prevImg.src = state.images[state.currentIndex - 1];
      preloadImages.push(prevImg);
    }

    // Cleanup function (images will remain in browser cache)
    return () => {
      preloadImages.forEach(img => {
        img.src = '';
      });
    };
  }, [state.currentIndex, state.images]);

  // Handle image load success
  const handleImageLoad = () => {
    // Image loaded successfully
  };

  // Handle image load error
  const handleImageError = () => {
    console.error(`Failed to load image at index ${state.currentIndex}`);
  };

  // Loading state
  if (state.isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // Error state or empty gallery
  if (state.error || state.images.length === 0) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <p className="text-white/60 text-lg">
          {state.error || 'No images found in gallery'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen relative bg-black overflow-hidden">
      {/* Image Display */}
      <ImageDisplay
        src={state.images[state.currentIndex]}
        alt={`Gallery image ${state.currentIndex + 1}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        fadeOut={fadeOut}
      />

      {/* Navigation Arrows */}
      <NavigationArrows
        onPrevious={navigatePrevious}
        onNext={navigateNext}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
      />

      {/* Position Indicator */}
      <PositionIndicator
        current={state.currentIndex + 1}
        total={state.images.length}
      />
    </div>
  );
};

export default CarouselGallery;
