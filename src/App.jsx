import React, { useState, useCallback, useMemo } from 'react'
import Hero from './sections/Hero'
import ShowcaseSection from './sections/ShowcaseSection'
import NavBar from './components/NavBar'
import LogoSection from './sections/LogoSection'
import FeatureCards from './sections/FeatureCards'
import ExperienceSection from './sections/ExperienceSection'
import TechStack from './sections/TechStack'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Loader from './components/Loader'
import { LoadingContext } from './context/LoadingContext'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const loadingContextValue = useMemo(() => ({
    isLoaded: !isLoading,
  }), [isLoading]);

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      {/* LCP Background - always visible for fast LCP */}
      <div 
        className="fixed top-0 left-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <img 
          src="/images/bg.png" 
          alt="" 
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Loader - shows while loading */}
      {isLoading && (
        <Loader 
          onLoadComplete={handleLoadComplete} 
          minimumLoadTime={1000} // Reduced for better LCP
        />
      )}
      
      {/* Main Content - uses opacity for smooth transition while allowing paint */}
      <div 
        style={{ 
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
      >
        <NavBar />
        <Hero />
        <ShowcaseSection />
        <LogoSection />
        <FeatureCards />
        <ExperienceSection />
        <TechStack />
        {/* <Testimonials/> */}
        <Contact />
        <Footer />
      </div>
    </LoadingContext.Provider>
  )
}

export default App