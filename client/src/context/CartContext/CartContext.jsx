import { createContext, useState, useMemo } from "react";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const removeItemFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const clearCart = () => setCartItems([]);

    const getTotalCartPrice = useMemo(() => {
        return cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
        );
    }, [cartItems]);

    const getCartItemsCount = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems((prev) => {
            const present = prev.find((item) => item.id === product.id);
            if (present) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item,
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const updateQuantity = (productId, quantity) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item,
            ),
        );
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeItemFromCart,
                clearCart,
                getTotalCartPrice,
                getCartItemsCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
