import React from 'react';
import './Cart.css'
const Cart = ({ carts }) => {

    const reducersPrice = (x, y) => x + y.price * y.quantity;
    const total = carts.reduce(reducersPrice, 0);
    const reducersShipping = (x, y) => x + y.shipping;
    const shipping = carts.reduce(reducersShipping, 0);
    const reducersQuantity = (x, y) => x + y.quantity;
    const quantity = carts.reduce(reducersQuantity, 0);

    const taxString = (total * 0.1).toFixed(2);
    const tax = parseFloat(taxString);

    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Item : {quantity}</p>
            <p>Total Price : ${total}</p>
            <p>Total Shipping : ${shipping}</p>
            <p>Tax : ${tax}</p>
            <h4>Grand Total : ${tax + shipping + total}</h4>
        </div>
    );
};

export default Cart;