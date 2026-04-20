import React, { useCallback } from "react";
import ProductCard from "../component/product/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import ProductDetails from "../component/product/ProductDetails/ProductDetails";
import { getProductById } from "../services/api";

const ProductPage = () => {
    const { slug } = useParams();

    const fetchProduct = useCallback(() => getProductById(slug), [slug]);
    const { data, isLoading } = useFetch(fetchProduct);

    if (isLoading) return <p>Загрузка...</p>;
    if (!data || !data.product) return <h2>Товар не найден</h2>;

    return (
        <div>
            <ProductDetails product={data.product} />
        </div>
    );
};
export default ProductPage;
