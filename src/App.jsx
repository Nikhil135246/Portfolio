import React, { useState, Suspense } from 'react'
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
import Preloader from './components/Preloader'

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Preloader - shows while all assets are loading */}
      {!isLoaded ? (
        <Preloader onComplete={() => setIsLoaded(true)} />
      ) : (
        /* Main content - only renders after loading complete */
        <Suspense fallback={null}>
          <NavBar/>
          <Hero/>
          <ShowcaseSection/>
          <LogoSection/>
          <FeatureCards/>
          <ExperienceSection/>
          <TechStack/>
          {/* <Testimonials/> */}
          <Contact/>
          <Footer/>
        </Suspense>
      )}
    </>
  )
}

export default App