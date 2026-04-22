import React from "react";
import style from "./style.module.css";

const ProductDetails = ({ product }) => {
    return (
        <div className={style.detailsContainer}>
            <div className={style.detailsWrapper}>
                <div className={style.gallerySection}>
                    <div className={style.mainImage}>
                        <img src={product.images} alt={product.name} />
                    </div>
                </div>

                <div className={style.infoSection}>
                    <h1 className={style.title}>{product.name}</h1>

                    <div className={style.priceBlock}>
                        <span className={style.currentPrice}>
                            {product.price}₽
                        </span>
                        {product.oldPrice && (
                            <span className={style.oldPrice}>
                                {product.oldPrice}₽
                            </span>
                        )}
                    </div>
                    <h3>{product.description}</h3>
                    <div className={style.detailsInfo}>
                        <h2>Детали:</h2>
                        <div>
                            <p>Память: {product.specifications.ram}</p>
                            <p>Экран: {product.specifications.screen}</p>
                            <p>{product.specifications.battery}</p>
                            <p>{product.specifications.storage}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
