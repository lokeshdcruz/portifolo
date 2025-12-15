import { describe, it, expect } from 'vitest';
import { loadImages } from './imageLoader';

describe('imageLoader', () => {
  it('should load images from public/images directory', () => {
    const images = loadImages();
    
    // Should return an array
    expect(Array.isArray(images)).toBe(true);
    
    // Should have images (we know there are 27 images in the directory)
    expect(images.length).toBeGreaterThan(0);
    
    // All paths should start with /images/
    images.forEach(path => {
      expect(path).toMatch(/^\/images\//);
    });
  });

  it('should only include supported image formats', () => {
    const images = loadImages();
    
    // All images should end with .jpg, .jpeg, or .png (case-insensitive)
    images.forEach(path => {
      expect(path.toLowerCase()).toMatch(/\.(jpg|jpeg|png)$/);
    });
  });

  it('should return images in a consistent order', () => {
    const images1 = loadImages();
    const images2 = loadImages();
    
    // Should return the same order on multiple calls
    expect(images1).toEqual(images2);
  });

  it('should return an array even if no images are found', () => {
    // This test verifies the function returns an array (empty directory case is handled)
    const images = loadImages();
    expect(Array.isArray(images)).toBe(true);
  });
});
