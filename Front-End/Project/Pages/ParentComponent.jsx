// // ParentComponent.jsx

// import React, { useState } from 'react';
// import ProductCard from './ProductCard';

// const ParentComponent = () => {
//   const [cart, setCart] = useState([]);

//   // Function to add product to cart
//   const addToCart = (product) => {
//     setCart([...cart, product]); // Add product to cart array
//   };

//   return (
//     <div>
//       {/* Render ProductCard components and pass addToCart function */}
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} addToCart={addToCart} />
//       ))}

//       {/* Render Cart component and pass cart array */}
//       <Cart cart={cart} />
//     </div>
//   );
// };

// export default ParentComponent;
