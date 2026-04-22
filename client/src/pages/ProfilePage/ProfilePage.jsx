import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./ProfilePage.module.css";
import { useAuth } from "../../hooks/useAuth";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { user, signOutUser } = useAuth();

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
                        <p className={style.role}>Роль: {user.role}</p>
                    </div>
                </div>

                <div className={style.actions}>
                    <button className={style.ordersBtn}>Мои заказы</button>

                    <button className={style.logoutBtn} onClick={handleLogout}>
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
