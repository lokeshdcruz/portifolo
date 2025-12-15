# Design Document: Horizontal Carousel Gallery

## Overview

This design transforms the existing multi-section photography website into a clean, minimalist horizontal carousel gallery. The solution removes all text overlays, branding, and multiple sections, replacing them with a single full-screen carousel that displays images from the public/images folder. The design emphasizes simplicity, smooth interactions, and responsive image display.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│           App Component                  │
│  ┌───────────────────────────────────┐  │
│  │    Carousel Gallery Component     │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │   Image Display Area        │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌──────┐              ┌──────┐  │  │
│  │  │ Left │              │Right │  │  │
│  │  │Arrow │              │Arrow │  │  │
│  │  └──────┘              └──────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │   Position Indicator        │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Component Structure

- **App.tsx**: Root component that renders only the CarouselGallery
- **CarouselGallery.tsx**: Main carousel component managing state and navigation
- **ImageDisplay.tsx**: Component responsible for rendering individual images
- **NavigationArrows.tsx**: Left and right arrow controls
- **PositionIndicator.tsx**: Shows current position (e.g., "3 / 26")

## Components and Interfaces

### CarouselGallery Component

**Purpose**: Main container managing carousel state, navigation logic, and keyboard events

**Props**: None (loads images internally)

**State**:
```typescript
interface CarouselState {
  images: string[];           // Array of image paths
  currentIndex: number;       // Current image index (0-based)
  isLoading: boolean;         // Loading state for transitions
  error: string | null;       // Error message if image loading fails
}
```

**Key Methods**:
- `loadImages()`: Scans public/images folder and populates images array
- `navigateNext()`: Advances to next image
- `navigatePrevious()`: Goes to previous image
- `handleKeyPress(event)`: Handles arrow key navigation

### ImageDisplay Component

**Purpose**: Renders the current image with proper sizing and loading states

**Props**:
```typescript
interface ImageDisplayProps {
  src: string;                // Image source path
  alt: string;                // Alt text for accessibility
  onLoad: () => void;         // Callback when image loads
  onError: () => void;        // Callback on load error
}
```

### NavigationArrows Component

**Purpose**: Renders left and right navigation buttons

**Props**:
```typescript
interface NavigationArrowsProps {
  onPrevious: () => void;     // Previous button click handler
  onNext: () => void;         // Next button click handler
  canGoPrevious: boolean;     // Whether previous navigation is available
  canGoNext: boolean;         // Whether next navigation is available
}
```

### PositionIndicator Component

**Purpose**: Displays current position in gallery

**Props**:
```typescript
interface PositionIndicatorProps {
  current: number;            // Current image number (1-based for display)
  total: number;              // Total number of images
}
```

## Data Models

### Image Path Model

```typescript
type ImagePath = string;      // Relative path from public folder

interface ImageCollection {
  paths: ImagePath[];         // Ordered array of image paths
  count: number;              // Total number of images
}
```

### Navigation State

```typescript
interface NavigationState {
  currentIndex: number;       // Current position (0-based)
  canNavigateLeft: boolean;   // Whether left navigation is enabled
  canNavigateRight: boolean;  // Whether right navigation is enabled
}
```

## 
Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Navigation increments index correctly

*For any* carousel state where the current index is less than the total number of images minus one, clicking the next button should increment the current index by exactly 1.

**Validates: Requirements 2.2**

### Property 2: Navigation decrements index correctly

*For any* carousel state where the current index is greater than 0, clicking the previous button should decrement the current index by exactly 1.

**Validates: Requirements 2.3**

### Property 3: Image loader filters valid formats

*For any* collection of filenames, the image loader should only include files with extensions .jpg, .jpeg, or .png (case-insensitive) in the final image array.

**Validates: Requirements 3.2**

### Property 4: Image loader maintains order

*For any* set of image files loaded from the directory, the resulting array should maintain a consistent, deterministic order across multiple loads.

**Validates: Requirements 3.3**

### Property 5: Error handling preserves carousel functionality

*For any* image that fails to load, the carousel should remain navigable and functional, allowing users to skip to other images.

**Validates: Requirements 3.5**

### Property 6: Loading state transitions correctly

*For any* image navigation action, the loading state should be true immediately after navigation begins and false after the image load completes or fails.

**Validates: Requirements 4.2**

### Property 7: Rapid navigation maintains state consistency

*For any* sequence of rapid navigation clicks, the final carousel state should reflect a valid index within bounds, with no intermediate state corruption.

**Validates: Requirements 4.4**

### Property 8: Keyboard navigation equivalence

*For any* valid carousel state, pressing the right arrow key should produce the same index change as clicking the right navigation button.

**Validates: Requirements 5.1, 5.4**

### Property 9: Keyboard navigation equivalence (left)

*For any* valid carousel state, pressing the left arrow key should produce the same index change as clicking the left navigation button.

**Validates: Requirements 5.2, 5.4**

### Property 10: Position indicator accuracy

*For any* carousel state with a valid current index, the position indicator should display the current position as (currentIndex + 1) and the total as the length of the images array.

**Validates: Requirements 6.1**

### Property 11: Position indicator updates synchronously

*For any* navigation action (click or keyboard), the position indicator should update to reflect the new index before the next user interaction is possible.

**Validates: Requirements 6.2**

### Property 12: No text overlays in rendered output

*For any* rendered carousel state, the DOM should not contain elements with text content overlaying the image display area (excluding navigation controls and position indicator).

**Validates: Requirements 1.2**

### Property 13: Responsive image display

*For any* viewport width, the image should scale proportionally to fit within the viewport while maintaining its aspect ratio.

**Validates: Requirements 1.4**

## Error Handling

### Image Loading Errors

**Strategy**: Graceful degradation with user feedback

- When an individual image fails to load, display a placeholder or skip to the next available image
- Log errors to console for debugging
- Maintain carousel navigation functionality even with failed images
- Display error message if all images fail to load

**Implementation**:
```typescript
const handleImageError = (index: number) => {
  console.error(`Failed to load image at index ${index}`);
  // Mark image as failed but keep in array
  setFailedImages(prev => [...prev, index]);
  // Optionally auto-advance to next image
  if (index === currentIndex && canGoNext) {
    navigateNext();
  }
};
```

### Empty Image Directory

**Strategy**: Informative fallback UI

- Display a centered message: "No images found in gallery"
- Provide styling consistent with minimalist design
- Disable navigation controls

### Keyboard Event Conflicts

**Strategy**: Prevent default browser behavior

- Call `event.preventDefault()` on arrow key presses when carousel is active
- Ensure carousel has proper focus management
- Only capture arrow keys, allow other keyboard shortcuts to work normally

### Rapid Navigation

**Strategy**: Debouncing or state locking

- Implement a transition lock that prevents navigation during active transitions
- Queue navigation requests if needed
- Ensure state consistency by completing one transition before starting another

**Implementation**:
```typescript
const [isTransitioning, setIsTransitioning] = useState(false);

const navigateNext = () => {
  if (isTransitioning || currentIndex >= images.length - 1) return;
  
  setIsTransitioning(true);
  setCurrentIndex(prev => prev + 1);
  
  setTimeout(() => {
    setIsTransitioning(false);
  }, 500); // Match transition duration
};
```

## Testing Strategy

### Unit Testing

We will use **Vitest** with **React Testing Library** for unit testing. Unit tests will cover:

- **Component rendering**: Verify that CarouselGallery, NavigationArrows, and PositionIndicator render correctly
- **Initial state**: Verify carousel starts at index 0 with first image
- **Navigation controls visibility**: Verify arrows are present in the DOM
- **Edge cases**: Test behavior at first image (index 0) and last image (index = length - 1)
- **Empty state**: Test fallback message when no images are available
- **Keyboard event handling**: Verify event listeners are attached and preventDefault is called
- **Error boundaries**: Test that image load errors don't crash the application

Example unit test structure:
```typescript
describe('CarouselGallery', () => {
  it('should render the first image on mount', () => {
    render(<CarouselGallery />);
    expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('images/'));
  });

  it('should display navigation arrows', () => {
    render(<CarouselGallery />);
    expect(screen.getByLabelText('Previous image')).toBeInTheDocument();
    expect(screen.getByLabelText('Next image')).toBeInTheDocument();
  });

  it('should disable left arrow on first image', () => {
    render(<CarouselGallery />);
    const leftArrow = screen.getByLabelText('Previous image');
    expect(leftArrow).toBeDisabled();
  });
});
```

### Property-Based Testing

We will use **fast-check** for property-based testing in TypeScript/JavaScript. Property-based tests will verify universal behaviors across many generated inputs.

**Configuration**: Each property test will run a minimum of 100 iterations to ensure thorough coverage of the input space.

**Tagging Convention**: Each property-based test must include a comment with this exact format:
```typescript
// Feature: horizontal-carousel-gallery, Property {number}: {property_text}
```

Example property test structure:
```typescript
import fc from 'fast-check';

describe('Carousel Navigation Properties', () => {
  // Feature: horizontal-carousel-gallery, Property 1: Navigation increments index correctly
  it('should increment index by 1 when navigating next', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 20 }), // current index
        fc.integer({ min: 2, max: 25 }), // total images (must be > currentIndex)
        (currentIndex, totalImages) => {
          fc.pre(currentIndex < totalImages - 1); // precondition
          
          const nextIndex = currentIndex + 1;
          expect(nextIndex).toBe(currentIndex + 1);
          expect(nextIndex).toBeLessThan(totalImages);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: horizontal-carousel-gallery, Property 8: Keyboard navigation equivalence
  it('should produce same result for keyboard and click navigation', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 20 }),
        fc.constantFrom('click', 'keyboard'),
        (currentIndex, method) => {
          const nextIndexClick = currentIndex + 1;
          const nextIndexKeyboard = currentIndex + 1;
          expect(nextIndexClick).toBe(nextIndexKeyboard);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Testing

Integration tests will verify the complete user flow:

- Load gallery → verify images appear → navigate through all images → verify position indicator updates
- Test keyboard navigation flow from start to end
- Test error recovery when images fail to load
- Test responsive behavior at different viewport sizes

### Test Coverage Goals

- Unit test coverage: 80%+ for component logic
- Property tests: All 13 correctness properties implemented
- Integration tests: Cover main user journeys (browse gallery, keyboard navigation, error states)

## Implementation Notes

### Image Loading Strategy

Since we're using Vite, we'll use Vite's `import.meta.glob` to dynamically import all images from the public folder:

```typescript
const imageModules = import.meta.glob('/public/images/*.{jpg,jpeg,png}', { eager: true });
const imagePaths = Object.keys(imageModules).map(path => path.replace('/public', ''));
```

### Styling Approach

- Use Tailwind CSS for utility-first styling
- Full-screen layout with `h-screen` and `w-screen`
- Flexbox for centering images
- Absolute positioning for navigation arrows and position indicator
- CSS transitions for smooth image changes

### Performance Considerations

- Lazy load images using native `loading="lazy"` attribute
- Preload next/previous images for instant navigation
- Use CSS transforms for smooth transitions (GPU-accelerated)
- Optimize image sizes for web delivery

### Accessibility

- Proper alt text for all images
- Keyboard navigation support
- ARIA labels for navigation buttons
- Focus management for keyboard users
- Sufficient color contrast for position indicator

## Future Enhancements

- Touch/swipe gestures for mobile devices
- Thumbnail navigation strip
- Fullscreen mode
- Image zoom functionality
- Slideshow auto-play mode
- URL-based image sharing (deep linking)
