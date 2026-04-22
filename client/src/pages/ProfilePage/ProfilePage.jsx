import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./ProfilePage.module.css";
import { useAuth } from "../../hooks/useAuth";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { user, signOutUser } = useAuth();

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const response = await fetch(
                    "http://localhost:3000/api/orders",
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("authToken"),
                        },
                    },
                );
                const data = await response.json();
                if (data.success) {
                    setOrders(data.userOrders);
                }
            } catch (error) {
                console.error("Ошибка загрузки заказов:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const handleLogout = () => {
        signOutUser();
        navigate("/");
    };

    if (!user) {
        navigate("/auth/login");
        return null;
    }

    return (
        <div className={style.profilePage}>
            <div className={style.container}>
                <h1 className={style.title}>Личный кабинет</h1>
                <div className={style.profileCard}>
                    <div className={style.avatar}>
                        {user.firstName?.[0] || "U"}
                    </div>
                    <div className={style.userInfo}>
                        <h2>
                            {user.firstName} {user.lastName}
                        </h2>
                        <p className={style.email}>{user.email}</p>
                    </div>
                </div>

                <div className={style.ordersSection}>
                    <h2 className={style.sectionTitle}>История заказов</h2>

                    {isLoading ? (
                        <p>Загрузка...</p>
                    ) : orders.length === 0 ? (
                        <p>У вас пока нет заказов.</p>
                    ) : (
                        <div className={style.ordersList}>
                            {orders.map((order) => (
                                <div key={order.id} className={style.orderItem}>
                                    <div className={style.orderHeader}>
                                        <span>Заказ #{order.id}</span>
                                        <span className={style.orderDate}>
                                            {new Date(
                                                order.createdAt,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className={style.orderStatus}>
                                        Статус: <b>{order.status}</b>
                                    </div>
                                    <div className={style.orderAddress}>
                                        Адрес: {order.shippingAddress}
                                    </div>
                                    <div className={style.orderTotal}>
                                        Сумма:{" "}
                                        {order.totalAmount.toLocaleString()} ₽
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Кнопка выхода */}
                <div className={style.actions}>
                    <button className={style.logoutBtn} onClick={handleLogout}>
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
