import React from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../hooks/useWishlist";
import style from "./WishlistPage.module.css";
import ProductCard from "../../component/product/ProductCard/ProductCard";

const WishlistPage = () => {
    const navigate = useNavigate();
    const { wish, removeFromWishlist } = useWishlist();

    if (wish.length === 0) {
        return (
            <div className={style.emptyWishlist}>
                <h1>Избранное</h1>
                <p>У вас пока нет избранных товаров</p>
                <button onClick={() => navigate("/catalog?category=smartfony")}>
                    Перейти в каталог
                </button>
            </div>
        );
    }

    return (
        <div className={style.wishlistPage}>
            <h1>Избранное ({wish.length})</h1>

            <div className={style.wishlistGrid}>
                {wish.map((product) => (
                    <div key={product.id} className={style.wishlistItem}>
                        <ProductCard product={product} />
                        <button
                            className={style.removeBtn}
                            onClick={() => removeFromWishlist(product.id)}
                        ></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;
