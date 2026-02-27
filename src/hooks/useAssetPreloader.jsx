import { useState, useEffect } from 'react';
import { IMAGES } from '../config/assets';

/**
 * Custom hook to preload images
 * Models are loaded by Canvas components to avoid WebGL context conflicts
 */
export const useAssetPreloader = () => {
  const [imageProgress, setImageProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Preload all images
    let loadedImages = 0;
    const totalImages = IMAGES.length;

    if (totalImages === 0) {
      setImageProgress(100);
    } else {
      const imagePromises = IMAGES.map((imagePath) => {
        return new Promise((resolve) => {
          const img = new Image();
          
          img.onload = () => {
            loadedImages++;
            setImageProgress((loadedImages / totalImages) * 100);
            resolve();
          };
          
          img.onerror = () => {
            console.warn(`Failed to load image: ${imagePath}`);
            loadedImages++;
            setImageProgress((loadedImages / totalImages) * 100);
            resolve(); // Resolve anyway to continue loading
          };
          
          img.src = imagePath;
        });
      });

      Promise.all(imagePromises).then(() => {
        console.log('All images preloaded successfully');
      });
    }

  }, []);

  // Mark complete when images are loaded
  useEffect(() => {
    if (imageProgress >= 99.9) {
      setIsComplete(true);
    }
  }, [imageProgress]);

  return {
    progress: Math.round(imageProgress),
    isComplete,
  };
};
