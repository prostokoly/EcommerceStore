import React, { useState } from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import { useWishlist } from "../../../hooks/useWishlist";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
    // const [isLiked, setIsLiked] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const { addToCart } = useCart();
    const { addToWishlist, isInWishlist } = useWishlist();

    const isLiked = isInWishlist(product.id);

    const handleAddToWishlist = () => {
        // setIsLiked(!isLiked);
        addToWishlist(product);
        toast.success("Товар добавлен в избранное!", {
            icon: "❤️",
            duration: 2000,
            position: "top-right",
            style: {
                background: "#ef4444",
                color: "#fff",
            },
        });
    };
    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);

        setTimeout(() => {
            setIsAdded(false);
        }, 2500);
        toast.success(`Товар "${product.name}" добавлен в корзину!`, {
            duration: 3000,
            position: "top-right",
            style: {
                background: "#212322",
                color: "#fff",
            },
        });
    };
    const formatPrice = (price) => {
        return new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const discount = product.oldPrice
        ? Math.round(
              ((product.oldPrice - product.price) / product.oldPrice) * 100,
          )
        : 0;

    return (
        <div className={style.item}>
            {discount > 0 && (
                <span className={style.discount}>-{discount}%</span>
            )}

            <button
                className={`${style.wishlistButton} ${isLiked ? style.active : ""}`}
                onClick={handleAddToWishlist}
            >
                {isLiked ? "❤️" : "🤍"}
            </button>

            <img
                src={product.images?.[0] || "/placeholder.jpg"}
                alt={product.name}
            />
            <h3>{product.name}</h3>
            <Link to={`/product/${product.slug}`}>
                <h3 style={{ textDecoration: "none" }}>Посмотреть подробнее</h3>
            </Link>

            <div className={style.priceContainer}>
                <span className={style.price}>
                    {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                    <span className={style.oldPrice}>
                        {formatPrice(product.oldPrice)}
                    </span>
                )}
            </div>

            <button
                className={style.buyButton}
                // onClick={() => }
            >
                Купить
            </button>

            <button
                className={style.buyButton}
                onClick={handleAddToCart}
                disabled={isAdded}
            >
                {isAdded ? "Добавлено" : "Добавить"}
            </button>
        </div>
    );
};

export default ProductCard;
