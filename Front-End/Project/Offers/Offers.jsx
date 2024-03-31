import React from 'react';
import './Offers.css';
import exclusiveImg from '../Assets/men_hoodie.png'
import { Link } from 'react-router-dom';

const Offers = () => {
  return (
    <div className='offers'>
      <div className="left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
       <Link to='/men'><button>Check Now</button></Link> 
      </div>
      <div className="right">
        <img src={exclusiveImg} alt="Exclusive Offer" />
      </div>
    </div>
  );
}

export default Offers;
