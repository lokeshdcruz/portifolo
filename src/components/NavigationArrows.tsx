interface NavigationArrowsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

const NavigationArrows = ({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: NavigationArrowsProps) => {
  return (
    <>
      {/* Left Arrow */}
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        aria-label="Previous image"
        className={`absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white transition-all duration-300 ${
          canGoPrevious
            ? 'opacity-70 hover:opacity-100 hover:bg-black/60 hover:scale-110 active:scale-95 cursor-pointer'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-0.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next image"
        className={`absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white transition-all duration-300 ${
          canGoNext
            ? 'opacity-70 hover:opacity-100 hover:bg-black/60 hover:scale-110 active:scale-95 cursor-pointer'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </>
  );
};

export default NavigationArrows;
