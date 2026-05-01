import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./cartPage.module.css";

const CartSummary = ({ total, itemCount }) => {
    const navigate = useNavigate();

    const shipping = total > 10000 ? 0 : 290;
    const tax = total * 0.02;
    const finalTotal = total + shipping + tax;

    const handleCheckout = () => {
        navigate("/checkout");
    };

    return (
        <div className={style.cartSummary}>
            <h2 className={style.summaryTitle}>Чек</h2>

            <div className={style.summaryRow}>
                <span>Товары ({itemCount}):</span>
                <span>{total.toLocaleString()}₽</span>
            </div>

            <div className={style.summaryRow}>
                <span>Налог (2%):</span>
                <span>{tax.toLocaleString()}₽</span>
            </div>

            <div className={style.summaryRow}>
                <span>Доставка:</span>
                <span>{shipping === 0 ? "Бесплатно" : `${shipping}₽`}</span>
            </div>

            <div className={`${style.summaryRow} ${style.totalRow}`}>
                <span>Итого:</span>
                <span className={style.totalValue}>
                    {finalTotal.toLocaleString()}₽
                </span>
            </div>

            <button className={style.checkoutBtn} onClick={handleCheckout}>
                Оформить заказ
            </button>
        </div>
    );
};

export default CartSummary;
