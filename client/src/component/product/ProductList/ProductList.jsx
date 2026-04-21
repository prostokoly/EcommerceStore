import React, { useEffect, useState } from "react";
import { getCategories, getProductCategory } from "../../../services/api";

import style from "./style.module.css";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [filterdProduct, setFilteredProduct] = useState([]);

    useEffect(() => {
        const loadFilteredProduct = async () => {
            try {
                setIsLoading(true);

                const categoriesResponse = await getCategories();
                const categories =
                    categoriesResponse.list || categoriesResponse;

                const productPromise = categories.map((category) =>
                    getProductCategory(category.slug)
                        .then((res) => ({
                            category: category.name,
                            product: res.productList?.[1] || null,
                        }))
                        .catch(() => ({
                            category: category.name,
                            product: null,
                        })),
                );

                const result = await Promise.all(productPromise);

                const featured = result
                    .filter((result) => result.product !== null)
                    .map((result) => result.product);
                setFilteredProduct(featured);
            } catch (error) {
                console.log("Ошибка загрузки популярных товаров", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadFilteredProduct();
    }, []);

    if (isLoading) return <p>Загрузка товаров...</p>;
    if (filterdProduct.length === 0) {
        return (
            <div>
                <p>Товары временно отсутствуют</p>
            </div>
        );
    }
    return (
        <div className={style.grid}>
            {filterdProduct.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
