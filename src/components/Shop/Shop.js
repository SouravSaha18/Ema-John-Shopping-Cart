import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [carts, setCarts] = useState([]);
    useEffect(() => {
        fetch(`products.json`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        //console.log(storedCart);
        for (const id in storedCart) {
            const addProduct = products.find(product => product.id === id);
            if (addProduct) {
                const quantity = storedCart[id];
                addProduct.quantity = quantity;
                savedCart.push(addProduct);
            }
        }
        setCarts(savedCart);
    }, [products]);

    const addToCart = selectedProduct => {
        let newCart = [];
        const exits = carts.find(product => product.id === selectedProduct.id);
        if (!exits) {
            selectedProduct.quantity = 1;
            newCart = [...carts, selectedProduct];
        }
        else {
            exits.quantity++;
            const rest = carts.filter(product => product.id !== selectedProduct.id);
            newCart = [...rest, exits];
        }
        setCarts(newCart);
        addToDb(selectedProduct.id);
    }


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
                    <Cart carts={carts}></Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;