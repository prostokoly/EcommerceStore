import React from "react";
import { Link } from "react-router-dom";

const AuthRegister = () => {
    return (
        <div>
            <h1>Регистрация</h1>
            <p>Уже есть аккаунт?</p>
            <Link to="/auth/login">Войти</Link>
        </div>
    );
};

export default AuthRegister;
