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
      {/* Loader - shows on top while loading */}
      {isLoading && (
        <Loader 
          onLoadComplete={handleLoadComplete} 
          minimumLoadTime={1000} // Reduced for better LCP
        />
      )}
      
      {/* Main Content - rendered underneath loader for LCP paint */}
      <div 
        style={{ 
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
      >        <NavBar />
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