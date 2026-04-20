import React, { useCallback } from "react";
import ProductCard from "../component/product/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import ProductDetails from "../component/product/ProductDetails/ProductDetails";
import { getProductById } from "../services/api";
// import { style } from "./"

const ProductPage = () => {
    const { slug } = useParams();

    const fetchProduct = useCallback(() => getProductById(slug), [slug]);
    const { data, isLoading } = useFetch(fetchProduct);

    // ✅ Проверяем data.product (не productList!)
    if (isLoading) return <p>Загрузка...</p>;
    if (!data || !data.product) return <h2>Товар не найден</h2>;

    console.log("Товар:", data.product); // Для отладки

    return (
        <div>
            {/* ✅ Передаём data.product */}
            <ProductDetails product={data.product} />
        </div>
    );
};
export default ProductPage;
