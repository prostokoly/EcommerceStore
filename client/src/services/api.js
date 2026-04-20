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
