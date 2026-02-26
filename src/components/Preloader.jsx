import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAssetPreloader } from '../hooks/useAssetPreloader';

/**
 * Preloader component that displays loading progress
 * Shows while images are being loaded
 * 3D models load on-demand via Canvas Suspense to avoid WebGL context conflicts
 */
const Preloader = ({ onComplete }) => {
  const { progress, isComplete } = useAssetPreloader();
  const preloaderRef = useRef(null);
  const progressBarRef = useRef(null);
  const percentageRef = useRef(null);

  useEffect(() => {
    if (isComplete && onComplete) {
      // Small delay to ensure all assets are cached
      setTimeout(() => {
        // Animate out the preloader
        const tl = gsap.timeline({
          onComplete: () => {
            onComplete();
          }
        });

        tl.to(percentageRef.current, {
          opacity: 0,
          duration: 0.3,
        })
        .to(progressBarRef.current, {
          scaleX: 0,
          transformOrigin: 'right',
          duration: 0.5,
          ease: 'power2.inOut',
        }, '-=0.2')
        .to(preloaderRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        }, '-=0.3');
      }, 300);
    }
  }, [isComplete, onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black-100"
    >
      <div className="text-center px-5">
        {/* Logo or Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            Loading<span className="text-blue-500">.</span>
          </h1>
          <p className="text-white-50 text-sm md:text-base">
            Preparing your experience...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative w-64 md:w-80 h-2 bg-white-800 rounded-full overflow-hidden mx-auto mb-4">
          <div
            ref={progressBarRef}
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <p
          ref={percentageRef}
          className="text-white-50 text-lg md:text-xl font-semibold"
        >
          {progress}%
        </p>

        {/* Loading dots animation */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
