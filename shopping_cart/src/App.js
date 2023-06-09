/** @format */
import { useState } from 'react';
import ShopStickyBar from './components/ShopStickyBar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ShoppingPage from './components/ShoppingPage';
import products from './components/products';
import Cart from './components/Cart';
import { DetailCard } from './components/templates/ProductCards';

function App() {
    const [cartContent, setCartContent] = useState([]);
    const handleAddToCart = (item) => {
        // Add item to cart.
        setCartContent([...cartContent, item]);
        alert(
            `Product added to cart. You don't see any change in this page, but please don't worry: the changes happen on the other page. See the cart page to confirm.`
        );
    };
    const handleRemoveFromCart = (item) => {
        // Remove item from cart.
        setCartContent(cartContent.filter((i) => i.id !== item.id));
    };
    const handleEmptyCart = () => {
        // Empty cart.
        setCartContent([]);
    };
    const [totalPrice, setTotalPrice] = useState(0);
    const handleAddTotalPrice = (price) => {
        // Increase total price by the value of current item's price.
        setTotalPrice(totalPrice + price);
    };
    const handleDecreaseTotalPrice = (price) => {
        // Decrease total price by the value of current item's price.
        setTotalPrice(totalPrice - price);
    };
    const handleResetTotalPrice = () => {
        // Reset total price.
        setTotalPrice(0);
    };
    return (
        <div>
            <ShopStickyBar></ShopStickyBar>
            <Routes>
                <Route
                    path='/'
                    exact
                    element={<HomePage />}
                ></Route>
                <Route
                    path='/shop'
                    element={<ShoppingPage object={products}></ShoppingPage>}
                ></Route>
                <Route
                    path='/cart'
                    element={
                        <Cart
                            array={cartContent}
                            total={totalPrice}
                            remove={handleRemoveFromCart}
                            decrease={handleDecreaseTotalPrice}
                            empty={handleEmptyCart}
                            zero={handleResetTotalPrice}
                        ></Cart>
                    }
                ></Route>
                <Route
                    path='/shop/:id'
                    element={
                        <DetailCard
                            cart={handleAddToCart}
                            total={handleAddTotalPrice}
                        ></DetailCard>
                    }
                ></Route>
            </Routes>
        </div>
    );
}

export default App;
