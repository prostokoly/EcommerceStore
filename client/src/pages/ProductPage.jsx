import React, { useCallback } from "react";
import ProductCard from "../component/product/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import ProductDetails from "../component/product/ProductDetails/ProductDetails";
import { getProductById } from "../services/api";
// import { style } from "./"

const ProductPage = () => {
    const { id } = useParams();
    console.log(id);

    const fetchProduct = useCallback(() => getProductById(id), []);
    const { product, isLoading } = useFetch(fetchProduct);
    console.log(product);
    if (isLoading) return <p>Загрузка...</p>;
    if (!product) return <h2>Товар не найден</h2>;
    return (
        <div>
            <ProductDetails product={product} />
        </div>
    );
};

export default ProductPage;
