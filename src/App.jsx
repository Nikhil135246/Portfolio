import React, { useState, useCallback } from 'react'
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

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Loader - shows while loading */}
      {isLoading && (
        <Loader 
          onLoadComplete={handleLoadComplete} 
          minimumLoadTime={3000} // 3 seconds minimum
        />
      )}
      
      {/* Main Content - always rendered to allow 3D models to load in background */}
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
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
    </>
  )
}

export default App