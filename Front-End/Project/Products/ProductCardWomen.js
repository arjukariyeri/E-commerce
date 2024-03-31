import React from 'react';

const ProductCardWomen = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>New Price: ${product.new_price}</p>
      <p>Old Price: <del>${product.old_price}</del></p>
    </div>
  );
}

export default ProductCardWomen;
