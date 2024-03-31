import React from 'react'
import './Hero.css'
import arrrow_icon from '../Assets/arrow.png'
import hero_img from '../Assets/hero_image.png'
import { Link } from 'react-router-dom'


const Hero = () => {
  return (
    <div className='hero'>
         <div className="hero-left">
             <div className='text'>
             <div><p>Elevate your style with the latest Trends. <br /> Discover Fashion at StyleUp.com.</p></div>
            </div>
            <Link to="/women"><div className="arrow-btn">
            <div>Latest Collection</div>
              <img src={arrrow_icon} alt="" />
            </div></Link>  
         </div>

      <div className="hero-right">
        <img src={hero_img} alt="" />
      </div>
    </div>

  )
}

export default Hero