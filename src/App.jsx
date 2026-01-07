import React from 'react'
import Hero from './sections/Hero'
import ShowcaseSection from './sections/ShowcaseSection'
import NavBar from './components/NavBar'

const App = () => {
  return (
    // very first step empty fragment
    <>
    <NavBar/>
    <Hero/>
    <ShowcaseSection/>
    </>
  )
}

export default App