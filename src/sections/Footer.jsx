import React from 'react'
import { socialImgs } from '../constants'

// Brand colors for social media platforms
const socialColors = {
  insta: '#E1306C',      // Instagram pink
  fb: '#a7cbd7',         // X (Twitter) black
  gh: '#fff6f6',         // GitHub dark gray
  linkedin: '#35aeef',   // LinkedIn blue
};

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container -mb-8'>
        <div className='flex flex-col justify-center'>
          <a href="/">Visit my blog</a>
        </div>
        <div className='socials'>
          {socialImgs.map((img) => (
            <a 
              key={img.name} 
              href={img.url}
              className="social-icon-wrapper"
              style={{
                '--glow-color': socialColors[img.name]
              }}
            >
              <img src={img.imgPath} alt={img.name} />
            </a>
          ))}
        </div>

          <div className="flex flex-col justify-center">
            <p className="text-center md:text-end">
              © {new Date().getFullYear()} Adrian | JS Mastery. All rights reserved.
            </p>
          </div>


      </div>
    </footer>
  )
}

export default Footer