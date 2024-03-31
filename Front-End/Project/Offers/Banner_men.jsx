import React from 'react';
import mens_banner from '../Assets/banner_mens.png';
import './Banner_men.css'; // Import CSS file for styling

function Banner_men({ onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="banner-container" onClick={handleClick}>
      <img src={mens_banner} alt="" />
    </div>
  );
}

export default Banner_men;
