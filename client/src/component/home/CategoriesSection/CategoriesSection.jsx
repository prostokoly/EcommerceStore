import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { getCategories } from "../../../services/api";

import style from "./style.module.css";

const CategoriesSection = () => {
    const { data: categories, isLoading } = useFetch(getCategories);
    return (
        <div className={style.categoriesSection}>
            <h2>Популярные категории</h2>
            {isLoading && <p>Загружаем категории...</p>}
            {!isLoading && categories && categories.list && (
                <div className={style.categoriesGrid}>
                    {categories.list.map((category) => (
                        <Link
                            to={`/catalog?category=${category.slug}`}
                            className={style.categoryCard}
                            key={category.id}
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className={style.categoryImage}
                            />
                            <p className={style.categoryName}>
                                {category.name}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoriesSection;
