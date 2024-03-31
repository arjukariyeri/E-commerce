import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductCard from '../Products/ProductCard';
import BannerWomen from '../Offers/Banner_women';
import './Women.css';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';

const Women = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, isLoggedIn } = useContext(ShopContext);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/allproducts');
        console.log(response.data);

        const womenProducts = response.data.filter(product => product.category === 'women');
        setProducts(womenProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleScrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <div>
      <BannerWomen onClick={handleScrollToProducts} />
      <br /><br /> <h1 className="women-title"> <span>WOMEN'S PRODUCTS</span></h1><br /><br />
      <div id="products-section" className="product-grid">
        {products.map(product => (
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

export default Women;
