//File Path: frontend/src/Context/ShopContext.jsx

import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 301; index++) { // Simplified loop range
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then(response => response.json())
            .then(data => setAll_Product(data))
            .catch(error => console.error('Error fetching products:', error));

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                // No body needed for fetching cart
            })
                .then(response => response.json())
                .then(data => setCartItems(data))
                .catch(error => console.error('Error fetching cart:', error));
        }
    }, []);

    const addToCart = (itemId) => {
    setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem('auth-token')) {
        fetch('http://localhost:4000/addtocart', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "itemId": String(itemId) }), // Ensure itemId is a string
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error adding to cart:', error));
    }
};


    const removeFromCart = (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error removing from cart:', error));
        }
    }

    const getTotalCartAmount = () => {
        return all_product.reduce((totalAmount, product) => {
            const itemId = product.id;
            if (cartItems[itemId] > 0) {
                totalAmount += product.new_price * cartItems[itemId];
            }
            return totalAmount;
        }, 0);
    }

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((totalItem, quantity) => quantity > 0 ? totalItem + quantity : totalItem, 0);
    }

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
