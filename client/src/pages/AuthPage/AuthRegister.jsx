import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./AuthRegister.module.css";
import { useAuth } from "../../hooks/useAuth";

const AuthRegister = () => {
    const navigate = useNavigate();
    const { signUpUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",

        firstName: "",
        lastName: "",
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
            await signUpUser(formData);
            navigate("/");
        } catch (err) {
            const msg =
                err.response?.data?.message ||
                "Ошибка регистрации. Попробуйте другой email.";
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={style.registerPage}>
            <div className={style.registerContainer}>
                <div className={style.formSection}>
                    <div className={style.logoPlaceholder}>
                        <img src="/Header/phone.svg" alt="Logo" />

                        <h2>КИБЕР САД</h2>
                    </div>

                    <h1 className={style.title}>Регистрация</h1>
                    <p className={style.subtitle}>
                        Создайте аккаунт, чтобы начать покупки
                    </p>

                    <form onSubmit={handleSubmit} className={style.form}>
                        <div className={style.nameRow}>
                            <div className={style.inputGroup}>
                                <label>Имя</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Иван"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={style.inputGroup}>
                                <label>Фамилия</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Иванов"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

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
                                minLength={6}
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
                            {isLoading
                                ? "Регистрация..."
                                : "Зарегистрироваться"}
                        </button>
                    </form>

                    <div className={style.footerLinks}>
                        <p>
                            Уже есть аккаунт?
                            <Link to="/auth/login">Войти</Link>
                        </p>
                    </div>
                </div>

                <div className={style.imageSection}>
                    <img src="/Auth/signUp.png" alt="Register Visual" />
                </div>
            </div>
        </div>
    );
};

export default AuthRegister;
