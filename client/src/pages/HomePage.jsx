import React from "react";
import Banner from "../component/home/BigBanner/Banner";
import SmallBanner from "../component/home/SmallBanner/SmallBanner";
import CategoriesSection from "../component/home/CategoriesSection/CategoriesSection";
import ProductList from "../component/product/ProductList/ProductList";

const HomePage = () => {
    return (
        <div className="homePage">
            <Banner />
            <SmallBanner />
            <CategoriesSection />
            <ProductList />
        </div>
    );
};

export default HomePage;
