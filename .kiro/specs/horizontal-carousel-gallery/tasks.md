# Implementation Plan

- [x] 1. Set up testing infrastructure




  - Install Vitest and React Testing Library for unit testing
  - Install fast-check for property-based testing
  - Configure test scripts in package.json
  - Create test setup file with necessary imports and configurations
  - _Requirements: All (testing foundation)_

- [x] 2. Create image loading utility





  - Write function to load all images from public/images directory using Vite's import.meta.glob
  - Filter images by supported formats (jpg, jpeg, png)
  - Return ordered array of image paths
  - Handle empty directory case
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ]* 2.1 Write property test for image loader
  - **Property 3: Image loader filters valid formats**
  - **Validates: Requirements 3.2**

- [ ]* 2.2 Write property test for image loader ordering
  - **Property 4: Image loader maintains order**
  - **Validates: Requirements 3.3**

- [ ]* 2.3 Write unit tests for image loader
  - Test that loader returns array of strings
  - Test empty directory returns empty array
  - Test mixed file types filters correctly
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 3. Implement PositionIndicator component





  - Create component that displays "current / total" format
  - Accept current and total as props
  - Style with minimalist design (small text, subtle positioning)
  - Ensure visibility against various backgrounds using text shadow or background
  - _Requirements: 6.1, 6.3, 6.4, 6.5_

- [ ]* 3.1 Write property test for position indicator
  - **Property 10: Position indicator accuracy**
  - **Validates: Requirements 6.1**

- [ ]* 3.2 Write unit tests for PositionIndicator
  - Test correct display format
  - Test with various current/total combinations
  - Test rendering with props
  - _Requirements: 6.1_

- [x] 4. Implement NavigationArrows component





  - Create left and right arrow buttons
  - Accept onPrevious, onNext, canGoPrevious, canGoNext as props
  - Disable/hide arrows based on can* props
  - Style arrows to match reference design (positioned on sides)
  - Add ARIA labels for accessibility
  - _Requirements: 2.1, 2.4, 2.5_

- [ ]* 4.1 Write unit tests for NavigationArrows
  - Test arrows render correctly
  - Test disabled state on first image
  - Test disabled state on last image
  - Test click handlers are called
  - Test ARIA labels are present
  - _Requirements: 2.1, 2.4, 2.5_

- [x] 5. Implement ImageDisplay component





  - Create component that renders a single image
  - Accept src, alt, onLoad, onError as props
  - Display loading state while image loads
  - Handle image load errors gracefully
  - Style for full-screen responsive display with aspect ratio preservation
  - _Requirements: 1.3, 1.4, 4.2_

- [ ]* 5.1 Write property test for loading state
  - **Property 6: Loading state transitions correctly**
  - **Validates: Requirements 4.2**

- [ ]* 5.2 Write property test for error handling
  - **Property 5: Error handling preserves carousel functionality**
  - **Validates: Requirements 3.5**

- [ ]* 5.3 Write unit tests for ImageDisplay
  - Test image renders with correct src
  - Test loading state displays before image loads
  - Test onLoad callback is called
  - Test onError callback is called on failure
  - Test responsive styling is applied
  - _Requirements: 1.3, 1.4, 4.2_


- [x] 6. Implement CarouselGallery component core state




  - Create main component with state for images array, currentIndex, isLoading, error
  - Initialize state with images from image loader utility
  - Implement navigateNext and navigatePrevious functions
  - Add transition locking to prevent rapid navigation issues
  - Calculate canGoPrevious and canGoNext based on currentIndex
  - _Requirements: 1.1, 2.2, 2.3, 2.4, 2.5, 4.4_

- [ ]* 6.1 Write property test for next navigation
  - **Property 1: Navigation increments index correctly**
  - **Validates: Requirements 2.2**

- [ ]* 6.2 Write property test for previous navigation
  - **Property 2: Navigation decrements index correctly**
  - **Validates: Requirements 2.3**

- [ ]* 6.3 Write property test for rapid navigation
  - **Property 7: Rapid navigation maintains state consistency**
  - **Validates: Requirements 4.4**

- [ ]* 6.4 Write unit tests for CarouselGallery state
  - Test initial state has currentIndex = 0
  - Test navigateNext increments index
  - Test navigatePrevious decrements index
  - Test navigation respects boundaries
  - Test transition locking prevents rapid clicks
  - _Requirements: 1.1, 2.2, 2.3, 2.4, 2.5, 4.4_

- [x] 7. Add keyboard navigation to CarouselGallery




  - Implement handleKeyPress function for arrow key events
  - Add event listener on component mount
  - Call preventDefault on arrow keys to prevent browser scrolling
  - Remove event listener on component unmount
  - Ensure keyboard navigation uses same logic as click navigation
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]* 7.1 Write property test for keyboard navigation (right)
  - **Property 8: Keyboard navigation equivalence**
  - **Validates: Requirements 5.1, 5.4**

- [ ]* 7.2 Write property test for keyboard navigation (left)
  - **Property 9: Keyboard navigation equivalence (left)**
  - **Validates: Requirements 5.2, 5.4**

- [ ]* 7.3 Write unit tests for keyboard navigation
  - Test right arrow key navigates next
  - Test left arrow key navigates previous
  - Test preventDefault is called on arrow keys
  - Test event listener is added on mount
  - Test event listener is removed on unmount
  - _Requirements: 5.1, 5.2, 5.3, 5.5_

- [x] 8. Compose CarouselGallery component render





  - Render ImageDisplay with current image
  - Render NavigationArrows with navigation handlers
  - Render PositionIndicator with current position
  - Apply full-screen layout styling
  - Add smooth CSS transitions for image changes
  - Handle empty images array with fallback message
  - _Requirements: 1.1, 1.2, 1.5, 2.1, 4.1, 6.1_

- [ ]* 8.1 Write property test for position indicator updates
  - **Property 11: Position indicator updates synchronously**
  - **Validates: Requirements 6.2**

- [ ]* 8.2 Write property test for no text overlays
  - **Property 12: No text overlays in rendered output**
  - **Validates: Requirements 1.2**

- [ ]* 8.3 Write property test for responsive display
  - **Property 13: Responsive image display**
  - **Validates: Requirements 1.4**

- [ ]* 8.4 Write integration tests for CarouselGallery
  - Test complete navigation flow from first to last image
  - Test keyboard navigation through entire gallery
  - Test position indicator updates during navigation
  - Test error state when no images available
  - Test responsive behavior at different viewport sizes
  - _Requirements: 1.1, 1.4, 2.2, 2.3, 5.1, 5.2, 6.2_

- [x] 9. Update App.tsx to use CarouselGallery





  - Remove all existing components (Header, Hero, Gallery, About, Packages, Blogs, Testimonials, Contact, Footer, FloatingContact)
  - Import and render only CarouselGallery component
  - Remove unnecessary styling and wrapper divs
  - Ensure full-screen layout
  - _Requirements: 1.1, 1.2, 1.5_

- [ ]* 9.1 Write unit test for App component
  - Test that App renders CarouselGallery
  - Test that no other components are rendered
  - _Requirements: 1.1, 1.2_

- [-] 10. Add CSS transitions and polish


  - Add smooth fade or slide transitions between images
  - Ensure transition duration is 300-500ms
  - Add hover effects for navigation arrows
  - Optimize image loading with lazy loading
  - Add preloading for next/previous images
  - _Requirements: 4.1, 4.3_

- [ ]* 10.1 Write property test for transition timing
  - **Property: Transition duration within specified range**
  - **Validates: Requirements 4.3**

- [ ] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
