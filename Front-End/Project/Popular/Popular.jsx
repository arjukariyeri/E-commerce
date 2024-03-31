import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Popular.css';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';

function Popular() {
  const [popularProducts, setPopularProducts] = useState([]);
  const { addToCart, isLoggedIn } = useContext(ShopContext);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/popularinmen');
        setPopularProducts(response.data);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      }
    };

    fetchPopularProducts();
  }, []);


  const handleAddToCart = async (itemId) => {
    try {
      const message = await addToCart(itemId);
      alert(message);
    } catch (error) {
      alert(error);
    }
  };

  const handleBuyNowClick = () => {
    if (!isLoggedIn) {
      alert('Please Login to Continue.');
    }
  };



  return (
    <div className='popular'>
      <h1>POPULAR IN MEN</h1>
      <hr />
      <div className="popular-items">
        {popularProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <h3 className="product-name">{product.name}</h3>
            <div className="product-prices">
              <p className="old-price">₹{product.old_price}</p>
              <p className="deal-price"><b>Deal Price:</b> ₹{product.new_price}</p>
            </div>
            {isLoggedIn ? (
              <button className="buy-now-button" onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
            ) : (
              <Link to='/login'><button className="buy-now-button" onClick={handleBuyNowClick}>Buy Now</button></Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popular;

