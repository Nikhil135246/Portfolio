import React from 'react'
import { socialImgs } from '../constants'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='flex flex-col justify-center'>
          <a href="/">Visit my blog</a>

        </div>
        <div className='socials'>
        {socialImgs.map((img) => (
          <a key={img.name} href={img.url}>
            <img src={img.imgPath} alt={img.name} />
          </a>
        ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer