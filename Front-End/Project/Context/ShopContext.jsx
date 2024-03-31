import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_products, setAll_products] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/allproducts');
                setAll_products(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();

        
        if (localStorage.getItem('auth-token')) {
            setIsLoggedIn(true);
            fetchCartData(); 
        } else {
            setIsLoggedIn(false);
            setCartItems(getDefaultCart()); 
        }
    }, []);

    const fetchCartData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/getcart', {
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    const addToCart = async (itemId) => {
        try {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

            if (isLoggedIn) {
                await axios.post('http://localhost:4000/addtocart', { itemId }, {
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    }
                });
            }
            return 'Product added to cart successfully.';
        } catch (error) {
            console.error('Error adding product to cart:', error);
            throw 'Failed to add product to cart. Please try again later.';
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            if (cartItems[itemId] > 0) {
                setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

                if (isLoggedIn) {
                    await axios.post('http://localhost:4000/removefromcart', { itemId }, {
                        headers: {
                            'auth-token': localStorage.getItem('auth-token')
                        }
                    });
                }
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    // const getTotalCartAmount = () => {
    //     let totalAmount = 0;
    //     for (const item in cartItems) {
    //         if (cartItems[item] > 0) {
    //             let itemInfo = all_products.find((product) => product.id === Number(item));
    //             totalAmount += itemInfo.new_price * cartItems[item];
    //         }
    //     }
    //     return totalAmount;
    // };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        if (all_products && all_products.length > 0) {
            for (const item in cartItems) {
                if (cartItems[item] > 0) {
                    let itemInfo = all_products.find((product) => product.id === Number(item));
                    if (itemInfo && itemInfo.new_price) {
                        totalAmount += itemInfo.new_price * cartItems[item];
                    }
                }
            }
        }
        return totalAmount;
    };
    

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_products,
        cartItems,
        addToCart,
        removeFromCart,
        isLoggedIn, 
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
