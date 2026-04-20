import React, { useCallback } from "react";
import ProductList from "../component/product/ProductList/ProductList";
import { useSearchParams } from "react-router-dom";
import { getProductCategory } from "../services/api";
import { useFetch } from "../hooks/useFetch";
import ProductCard from "../component/product/ProductCard/ProductCard";
import CategoriesSection from "../component/home/CategoriesSection/CategoriesSection";

const CatalogPage = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    const fetch = useCallback(() => getProductCategory(category), [category]);
    const { data } = useFetch(fetch);

    if (!data?.productList || data.productList.length === 0) {
        return <h2>В этой категории товаров пока нет</h2>;
    }
    return (
        <div className="catalog-page">
            <CategoriesSection />
            <div>
                {data.productList.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default CatalogPage;
