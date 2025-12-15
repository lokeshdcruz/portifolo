/**
 * Image loader utility for loading images from public/images directory
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */

/**
 * Loads all images from the public/images directory
 * Filters by supported formats (jpg, jpeg, png)
 * Returns an ordered array of image paths
 * Handles empty directory case
 */
export function loadImages(): string[] {
  try {
    // Use Vite's import.meta.glob to load all images from public/images
    const imageModules = import.meta.glob('/public/images/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { 
      eager: true,
      query: '?url',
      import: 'default'
    });
    
    // Extract paths and convert from /public/... to /images/...
    const imagePaths = Object.keys(imageModules)
      .map(path => path.replace('/public', ''))
      .sort(); // Ensure consistent ordering
    
    return imagePaths;
  } catch (error) {
    console.error('Error loading images:', error);
    return [];
  }
}
