import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [carts, setCarts] = useState([]);
    useEffect(() => {
        fetch(`products.json`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    const addToCart = product => {
        const newCart = [...carts, product];
        setCarts(newCart);
    }
    const reducers = (x, y) => x + y.price;
    const total = carts.reduce(reducers, 0);

    return (
        <div>
            <div className='shop-container'>
                <div className='products-container'>
                    {
                        products.map(product => <Product
                            key={product.id}
                            product={product}
                            addToCart={addToCart}>
                        </Product>)
                    }
                </div>
                <div className='cart-container'>
                    <h4>Order Summary</h4>
                    <p>Selected Item : {carts.length}</p>
                    <p>Total : ${total}</p>
                </div>
            </div>
        </div>
    );
};

export default Shop;