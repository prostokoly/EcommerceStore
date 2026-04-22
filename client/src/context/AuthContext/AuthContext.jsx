import { createContext, useEffect, useState } from "react";
import { getMe, login, register } from "../../services/api";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const storedToken = localStorage.getItem("authToken");
            if (!storedToken) {
                setIsLoading(false);
                return;
            }
            try {
                const response = await getMe();
                setToken(storedToken);
                setUser(response.data);
            } catch (error) {
                console.log("Ошибка проверки авторизации", error);
                localStorage.getItem("authToken");
                setToken(null);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    const signInUser = async (email, password) => {
        try {
            const response = await login(email, password);

            const token = response.data?.token || response.token;
            const user = response.data?.user || response.user;

            if (!token) {
                throw new Error("Токен не найден в ответе сервера!");
            }

            localStorage.setItem("authToken", token);
            setToken(token);
            setUser(user);

            return response;
        } catch (error) {
            console.error("Ошибка при входе:", error);
            alert("Ошибка входа: " + error.message);
            throw error;
        }
    };

    const signUpUser = async (userData) => {
        try {
            const response = await register(userData);

            const token = response.data?.token || response.token;
            const user = response.data?.user || response.user;

            if (!token) {
                throw new Error("Сервер не вернул токен! ");
            }

            localStorage.setItem("authToken", token);
            setToken(token);
            setUser(user);

            return response;
        } catch (error) {
            alert("Ошибка регистрации: " + error.message);
            throw error;
        }
    };
    const signOutUser = async () => {
        localStorage.removeItem("authToken");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                signInUser,
                signUpUser,
                signOutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
