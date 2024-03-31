import React from 'react';
import womens_banner from '../Assets/banner_women.png';
import './Banner_men.css'; 

function Banner_women({ onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="banner-container" onClick={handleClick}>
      <img src={womens_banner} alt="" />
    </div>
  );
}

export default Banner_women;
