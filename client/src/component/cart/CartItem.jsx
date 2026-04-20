import React from "react";
import style from "./cartPage.module.css";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className={style.cartItem}>
            <img
                src={item.images?.[0] || "/placeholder.jpg"}
                alt={item.name}
                className={style.cartItemImage}
            />

            <div className={style.cartItemDetails}>
                <h3 className={style.cartItemName}>{item.name}</h3>
                <p className={style.cartItemPrice}>
                    {item.price.toLocaleString()}₽
                </p>
            </div>

            <div className={style.cartItemControls}>
                <div className={style.quantityControls}>
                    <button
                        className={style.quantityBtn}
                        onClick={() =>
                            onUpdateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                    >
                        −
                    </button>
                    <span className={style.quantityValue}>{item.quantity}</span>
                    <button
                        className={style.quantityBtn}
                        onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                        }
                    >
                        +
                    </button>
                </div>

                <div className={style.itemActions}>
                    <p className={style.cartItemTotal}>
                        {(item.price * item.quantity).toLocaleString()}₽
                    </p>
                    <button
                        className={style.removeBtn}
                        onClick={() => onRemove(item.id)}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
