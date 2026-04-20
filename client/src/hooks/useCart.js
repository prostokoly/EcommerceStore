import { useContext } from "react";
import { CartContext } from "../context/CartContext/CartContext";

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart");
    }
    return context;
};
