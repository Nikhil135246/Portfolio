import { useEffect, useState, useRef } from "react";
import { useProgress } from "@react-three/drei";

const Loader = ({ onLoadComplete, minimumLoadTime = 3000, maxLoadTime = 10000 }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isMinTimeComplete, setIsMinTimeComplete] = useState(false);
  const [isMaxTimeReached, setIsMaxTimeReached] = useState(false);
  const startTimeRef = useRef(Date.now());
  
  // Track actual 3D model loading progress
  const { progress: modelProgress, active: isLoading } = useProgress();

  // Handle minimum loading time
  useEffect(() => {
    const minTimer = setTimeout(() => {
      setIsMinTimeComplete(true);
    }, minimumLoadTime);

    // Safety fallback - max wait time
    const maxTimer = setTimeout(() => {
      setIsMaxTimeReached(true);
    }, maxLoadTime);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, [minimumLoadTime, maxLoadTime]);

  // Animate progress bar smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const timeProgress = Math.min((elapsed / minimumLoadTime) * 100, 100);
      
      // Combine time-based and model-based progress
      // Weight: 40% time, 60% actual model loading
      const combinedProgress = Math.min(
        (timeProgress * 0.4) + (modelProgress * 0.6),
        100
      );
      
      setDisplayProgress(prev => {
        const diff = combinedProgress - prev;
        if (Math.abs(diff) < 0.5) return combinedProgress;
        return prev + diff * 0.1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [modelProgress, minimumLoadTime]);

  // Complete loading when both conditions are met
  useEffect(() => {
    // Models are loaded when progress is 100 and no longer actively loading
    const modelsLoaded = modelProgress >= 100 && !isLoading;
    
    if ((isMinTimeComplete && modelsLoaded) || isMaxTimeReached) {
      // Small delay for smooth transition
      setTimeout(() => {
        onLoadComplete?.();
      }, 300);
    }
  }, [isMinTimeComplete, isMaxTimeReached, modelProgress, isLoading, onLoadComplete]);

  return (
    <div className="loader-container">
      <div className="loader-content">
        {/* Logo or Brand */}
        <div className="loader-logo">
          <span className="loader-brand">Nikhil</span>
        </div>

        {/* Animated Loading Ring */}
        <div className="loader-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>

        {/* Progress Bar */}
        <div className="loader-progress-container">
          <div 
            className="loader-progress-bar"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        {/* Loading Text */}
        <p className="loader-text">
          Loading Experience<span className="loader-dots"></span>
        </p>
        <p className="loader-percentage">{Math.round(displayProgress)}%</p>
      </div>
    </div>
  );
};

export default Loader;
