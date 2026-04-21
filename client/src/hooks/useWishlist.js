import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext/WishlistContext";

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist");
    }
    return context;
};
