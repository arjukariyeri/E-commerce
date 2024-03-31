import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './NewCollections.css';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';

function NewCollections() {
  const [newCollectionProducts, setNewCollectionProducts] = useState([]);
  const { addToCart, isLoggedIn } = useContext(ShopContext);

  useEffect(() => {
    const fetchNewCollectionProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/newcollections');
        setNewCollectionProducts(response.data);
      } catch (error) {
        console.error('Error fetching new collection products:', error);
      }
    };

    fetchNewCollectionProducts();
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
    <div className="new-collections-container">
      <h1 className="popular-title">NEW COLLECTIONS</h1>
      <hr className='underline' />
      <br />
      <br />
      <div className="product-grid">
        {newCollectionProducts.map(product => (
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

export default NewCollections;
