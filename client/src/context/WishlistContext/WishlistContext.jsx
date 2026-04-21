import { createContext, useState } from "react";

export const WishlistContext = createContext(null);

const WishlistProvider = ({ children }) => {
    const [wish, setWish] = useState([]);

    const addToWishlist = (product) => {
        setWish((prev) => {
            const present = prev.find((item) => item.id === product.id);
            if (present) {
                return prev.filter((item) => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWish((prev) => prev.filter((item) => item.id !== productId));
    };

    const isInWishlist = (productId) => {
        return wish.some((item) => item.id === productId);
    };

    return (
        <WishlistContext.Provider
            value={{
                wish,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistProvider;
