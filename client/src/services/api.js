import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const getCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getProduct = async (limit = 8) => {
    try {
        const response = await axios.get(`${BASE_URL}/products`, {
            params: { limit },
        });
        return response.data;
    } catch (error) {
        console.log("Ошибка загрузки товаров:", error);
    }
};

export const getProductById = async (slug) => {
    try {
        const response = await axios.get(`${BASE_URL}/products/${slug}`);
        return response.data;
    } catch (error) {
        console.log("Ошибка нет товара с таким id", error);
    }
};

export const getProductCategory = async (category) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/products?category=${category}`,
            // `${BASE_URL}/products?category=73`,
        );
        return response.data;
    } catch (error) {
        console.log("Ошибка в получении товаров нужной категории", error);
    }
};

//реализация авторизации

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.log(
            "Ошибка в методе login",
            error.response?.data || error.message,
        );
        throw error;
    }
};

export const register = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, data);
        return response.data;
    } catch (error) {
        console.log("Ошибка в методе register", error);
        throw error;
    }
};

export const getMe = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/me`);
        return response.data;
    } catch (error) {
        console.log("Ошибка в методе getMe", error);
        throw error;
    }
};

//  добавление токена
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

//  401 ошибки
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("authToken");
            window.location.href = "/auth";
        }
        return Promise.reject(error);
    },
);
