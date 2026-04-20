import React, { useCallback } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { getProduct } from "../../../services/api";

import style from "./style.module.css";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";

const ProductList = () => {
    const fetchProducts = useCallback(() => getProduct(8), []);
    const { data: products, isLoading } = useFetch(fetchProducts);

    if (isLoading) return <p>Загрузка товаров...</p>;
    return (
        <div className={style.grid}>
            {products.productList.map((product) => (
                <div>
                    <ProductCard key={product.id} product={product} />
                </div>
            ))}
        </div>
    );
};

export default ProductList;
