import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./AuthLogin.module.css";
import { useAuth } from "../../hooks/useAuth";

const AuthLogin = () => {
    const navigate = useNavigate();
    const { signInUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await signInUser(formData.email, formData.password);
            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Ошибка при входе. Проверьте данные.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={style.loginPage}>
            <div className={style.loginContainer}>
                <div className={style.formSection}>
                    <div className={style.logoPlaceholder}>
                        <img src="/Header/phone.svg" alt="Logo" />
                        <h2>КИБЕР САД</h2>
                    </div>

                    <h1 className={style.title}>Вход</h1>
                    <p className={style.subtitle}>
                        Введите данные для доступа к аккаунту
                    </p>

                    <form onSubmit={handleSubmit} className={style.form}>
                        <div className={style.inputGroup}>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={style.inputGroup}>
                            <label>Пароль</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {error && (
                            <div className={style.errorMessage}>{error}</div>
                        )}

                        <button
                            type="submit"
                            className={style.submitBtn}
                            disabled={isLoading}
                        >
                            {isLoading ? "Входим..." : "Войти"}
                        </button>
                    </form>

                    <div className={style.footerLinks}>
                        <p>
                            Нет аккаунта?{" "}
                            <Link to="/auth/register">Зарегистрироваться</Link>
                        </p>
                        <Link to="#" className={style.forgotPass}>
                            Забыли пароль?
                        </Link>
                    </div>
                </div>

                <div className={style.imageSection}>
                    <img src="/Auth/login1.png" alt="Login Visual" />
                </div>
            </div>
        </div>
    );
};

export default AuthLogin;
