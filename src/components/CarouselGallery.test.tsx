import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CarouselGallery from './CarouselGallery';

// Mock the image loader
vi.mock('../utils/imageLoader', () => ({
  loadImages: vi.fn(() => [
    '/images/test1.jpg',
    '/images/test2.jpg',
    '/images/test3.jpg',
  ]),
}));

describe('CarouselGallery - Basic Verification', () => {
  it('should render without crashing', () => {
    render(<CarouselGallery />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should initialize with first image', () => {
    render(<CarouselGallery />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Gallery image 1');
  });

  it('should display position indicator', () => {
    render(<CarouselGallery />);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('should display navigation arrows', () => {
    render(<CarouselGallery />);
    expect(screen.getByLabelText('Previous image')).toBeInTheDocument();
    expect(screen.getByLabelText('Next image')).toBeInTheDocument();
  });
});
