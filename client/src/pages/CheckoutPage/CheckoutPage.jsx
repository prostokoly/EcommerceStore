import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import style from "./CheckoutPage.module.css";

const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        address: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { cartItems, clearCart, getTotalCartPrice } = useCart();
    const { user } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!user) {
            alert("Пожалуйста, войдите в профиль");
            navigate("/auth/login");
            return;
        }
        try {
            const itemsToSend = cartItems.map((item) => ({
                id: item.id,
                quantity: item.quantity,
                name: item.name,
                image: item.images,
            }));

            const response = await fetch("http://localhost:3000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + localStorage.getItem("authToken"),
                },
                body: JSON.stringify({
                    shippingAddress: formData.city + ", " + formData.address,
                    items: itemsToSend,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Ошибка при создании заказа");
            }

            alert("Заказ оформлен!");
            clearCart();
            navigate("/profile");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    if (cartItems.length === 0) {
        return (
            <div className={style.checkoutPage}>
                <div className={`${style.container} ${style.emptyCart}`}>
                    <h2>Корзина пуста</h2>
                    <button
                        onClick={() => navigate("/catalog?category=noutbuki")}
                    >
                        Перейти к покупкам
                    </button>
                </div>
            </div>
        );
    }

    // const totalAmount = cartItems.reduce(
    //     (sum, item) => sum + item.price * item.quantity,
    //     0,
    // );

    return (
        <div className={style.checkoutPage}>
            <div className={style.container}>
                <h1 className={style.pageTitle}>Оформление заказа</h1>

                <div className={style.grid}>
                    <form className={style.formSection} onSubmit={handleSubmit}>
                        <h2 className={style.sectionTitle}>Адрес доставки</h2>

                        {[
                            {
                                label: "ФИО",
                                name: "fullName",
                                type: "text",
                                ph: "Иванов Иван",
                            },
                            {
                                label: "Email",
                                name: "email",
                                type: "email",
                                ph: "mail@example.com",
                            },
                            {
                                label: "Телефон",
                                name: "phone",
                                type: "tel",
                                ph: "+7...",
                            },
                            {
                                label: "Город",
                                name: "city",
                                type: "text",
                                ph: "Москва",
                            },
                            {
                                label: "Адрес",
                                name: "address",
                                type: "text",
                                ph: "Улица, дом",
                            },
                        ].map((field) => (
                            <div key={field.name} className={style.formGroup}>
                                <label className={style.label}>
                                    {field.label}
                                </label>
                                <input
                                    className={style.input}
                                    type={field.type}
                                    name={field.name}
                                    required
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.ph}
                                />
                            </div>
                        ))}

                        <button
                            className={style.submitBtn}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Оформление..." : "Подтвердить заказ"}
                        </button>
                    </form>

                    <aside className={style.summarySection}>
                        <div className={style.itemsBox}>
                            <h3 className={style.itemsTitle}>
                                Товары в заказе ({cartItems.length})
                            </h3>
                            {cartItems.map((item) => (
                                <div key={item.id} className={style.itemRow}>
                                    <div className={style.itemInfo}>
                                        <div className={style.itemName}>
                                            {item.name}
                                        </div>
                                        <div className={style.itemImg}>
                                            <img src={item.images} alt="" />
                                        </div>
                                        <div className={style.itemQuantity}>
                                            {item.quantity} шт.
                                        </div>
                                    </div>
                                    <div className={style.itemPrice}>
                                        {(
                                            item.price * item.quantity
                                        ).toLocaleString()}{" "}
                                        ₽
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={style.totalBox}>
                            <div className={style.totalRow}>
                                <span>Товары:</span>
                                <span>{getTotalCartPrice} ₽</span>
                            </div>
                            <div className={style.totalRow}>
                                <span>Доставка:</span>
                                <span
                                    style={{
                                        color: "#10b981",
                                        fontWeight: 600,
                                    }}
                                >
                                    Бесплатно
                                </span>
                            </div>
                            <div
                                className={style.totalRow}
                                className={style.totalFinal}
                            >
                                <span>Итого:</span>
                                <span>{getTotalCartPrice} ₽</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
