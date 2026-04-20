import React, { useState } from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    const [isLiked, setIsLiked] = useState(false);

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
                onClick={() => setIsLiked(!isLiked)}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={isLiked ? "#ef4444" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            </button>

            <img
                src={product.images?.[0] || "/placeholder.jpg"}
                alt={product.name}
            />
            <h3>{product.name}</h3>
            <Link to={`/product/${product.id}`}>
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

            <button className={style.buyButton}>Buy Now</button>
        </div>
    );
};

export default ProductCard;
