import React from "react";
import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
import style from "../component/cart/cartPage.module.css";
import { useCart } from "../hooks/useCart";
import CartItem from "../component/cart/CartItem";
import CartSummary from "../component/cart/CartSummary";

const CartPage = () => {
    const navigate = useNavigate();
    const {
        cartItems,
        updateQuantity,
        removeItemFromCart,
        getTotalCartPrice,
        getCartItemsCount,
        clearCart,
    } = useCart();

    const itemCount = getCartItemsCount;
    const total = getTotalCartPrice;

    if (cartItems.length === 0) {
        return (
            <div className={style.page}>
                <div className={style.container}>
                    <h1 className={style.pageTitle}>Корзина</h1>
                    <div className={style.emptyCart}>
                        <p className={style.emptyText}>Ваша корзина пуста</p>
                        <button
                            className={style.continueBtn}
                            onClick={() =>
                                navigate("/catalog?category=smartfony")
                            }
                        >
                            Перейти к покупкам
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={style.page}>
            <div className={style.container}>
                <h1 className={style.pageTitle}>Оформление заказа</h1>

                <div className={style.cartLayout}>
                    {/* Левая колонка - товары */}
                    <div className={style.cartItems}>
                        <h2 className={style.sectionTitle}>
                            Сводка заказа ({itemCount} товаров)
                        </h2>

                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeItemFromCart}
                            />
                        ))}

                        <button
                            className={style.clearCartBtn}
                            onClick={clearCart}
                        >
                            Очистить корзину
                        </button>
                    </div>

                    {/* Правая колонка - итог */}
                    <CartSummary total={total} itemCount={itemCount} />
                </div>
            </div>
        </div>
    );
};

export default CartPage;
