import React, { useState } from "react";
import style from "./style.module.css";
import { useCart } from "../../../hooks/useCart";
import { useWishlist } from "../../../hooks/useWishlist";

const ProductDetails = ({ product }) => {
    const [isAdded, setIsAdded] = useState(false);

    const { addToCart } = useCart();
    const { addToWishlist } = useWishlist();

    const handleAddToWishlist = () => {
        // setIsLiked(!isLiked);
        addToWishlist(product);
    };

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);

        setTimeout(() => {
            setIsAdded(false);
        }, 2500);
    };

    if (!product) return <div>Загрузка...</div>;

    return (
        <div className={style.productPage}>
            <div className={style.container}>
                <div className={style.imageSection}>
                    <div className={style.mainImageWrapper}>
                        <img
                            src={product.images || "/placeholder.jpg"}
                            alt={product.name}
                            className={style.mainImage}
                        />
                    </div>
                </div>

                <div className={style.infoSection}>
                    <h1 className={style.productTitle}>{product.name}</h1>

                    <div className={style.priceBlock}>
                        <span className={style.currentPrice}>
                            {product.price.toLocaleString()} ₽
                        </span>
                        {product.oldPrice && (
                            <span className={style.oldPrice}>
                                {product.oldPrice.toLocaleString()} ₽
                            </span>
                        )}
                    </div>

                    <p className={style.description}>{product.description}</p>

                    <div className={style.specsSection}>
                        <h3 className={style.specsTitle}>Характеристики</h3>
                        <ul className={style.specsList}>
                            {product.specifications?.ram && (
                                <li>
                                    <strong>Память:</strong>{" "}
                                    {product.specifications.ram}
                                </li>
                            )}
                            {product.specifications?.screen && (
                                <li>
                                    <strong>Экран:</strong>{" "}
                                    {product.specifications.screen}
                                </li>
                            )}
                            {product.specifications?.battery && (
                                <li>
                                    <strong>Аккумулятор:</strong>{" "}
                                    {product.specifications.battery}
                                </li>
                            )}
                            {product.specifications?.storage && (
                                <li>
                                    <strong>Накопитель:</strong>{" "}
                                    {product.specifications.storage}
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className={style.actions}>
                        <button
                            className={style.addToCartBtn}
                            onClick={handleAddToCart}
                        >
                            <img src="/Header/cart.svg" alt="cart" />
                        </button>
                        <button
                            className={style.wishlistBtn}
                            onClick={handleAddToWishlist}
                        >
                            <img
                                src="/Header/heart-love-like.svg"
                                alt="heart"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
