import React, { useState } from "react";
import style from "./style.module.css";

const ProductDetails = ({ product }) => {
    const [activeImage, setActiveImage] = useState(0);

    const formatPrice = (price) =>
        new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
        }).format(price);

    const images =
        product.images && product.images.length > 0
            ? product.images
            : ["/placeholder.jpg"];
    const mainImage = images[activeImage];

    const specs = product.specifications
        ? Object.entries(product.specifications)
        : [];

    return (
        <div className={style.detailsContainer}>
            <div className={style.detailsWrapper}>
                <div className={style.gallerySection}>
                    <div className={style.thumbnails}>
                        {images.map((img, index) => (
                            <button
                                key={index}
                                className={`${style.thumb} ${index === activeImage ? style.activeThumb : ""}`}
                                onClick={() => setActiveImage(index)}
                            >
                                <img src={img} alt={`thumb-${index}`} />
                            </button>
                        ))}
                    </div>

                    <div className={style.mainImage}>
                        <img src={mainImage} alt={product.name} />
                    </div>
                </div>

                <div className={style.infoSection}>
                    <h1 className={style.title}>{product.name}</h1>

                    <div className={style.priceBlock}>
                        <span className={style.currentPrice}>
                            {formatPrice(product.price)}
                        </span>
                        {product.oldPrice && (
                            <span className={style.oldPrice}>
                                {formatPrice(product.oldPrice)}
                            </span>
                        )}
                    </div>

                    <div className={style.options}>
                        <span>Select color :</span>
                        <div className={style.colors}>
                            <span
                                className={`${style.colorCircle} ${style.black}`}
                            ></span>
                            <span
                                className={`${style.colorCircle} ${style.purple}`}
                            ></span>
                            <span
                                className={`${style.colorCircle} ${style.red}`}
                            ></span>
                            <span
                                className={`${style.colorCircle} ${style.yellow}`}
                            ></span>
                        </div>
                    </div>

                    <div className={style.storageOptions}>
                        <button className={style.storageBtn}>128GB</button>
                        <button
                            className={`${style.storageBtn} ${style.activeStorage}`}
                        >
                            256GB
                        </button>
                        <button className={style.storageBtn}>512GB</button>
                        <button className={style.storageBtn}>1TB</button>
                    </div>

                    <div className={style.specsGrid}>
                        {specs.slice(0, 6).map(([key, value]) => (
                            <div key={key} className={style.specItem}>
                                <span className={style.specIcon}>📦</span>{" "}
                                <div className={style.specInfo}>
                                    <p className={style.specLabel}>{key}</p>
                                    <p className={style.specValue}>{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Описание */}
                    <p className={style.description}>
                        {product.description}{" "}
                        <a href="#" className={style.readMore}>
                            more...
                        </a>
                    </p>

                    {/* Кнопки */}
                    <div className={style.actions}>
                        <button className={style.btnWishlist}>
                            Add to Wishlist
                        </button>
                        <button className={style.btnCart}>Add to Card</button>
                    </div>

                    <div className={style.guarantees}>
                        <div className={style.guaranteeItem}>
                            <span>🚚</span>
                            <div>
                                <p>Free Delivery</p>
                                <strong>1-2 day</strong>
                            </div>
                        </div>
                        <div className={style.guaranteeItem}>
                            <span></span>
                            <div>
                                <p>In Stock</p>
                                <strong>Today</strong>
                            </div>
                        </div>
                        <div className={style.guaranteeItem}>
                            <span>🛡️</span>
                            <div>
                                <p>Guaranteed</p>
                                <strong>1 year</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
