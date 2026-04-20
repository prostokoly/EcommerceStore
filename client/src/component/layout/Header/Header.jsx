import React from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={style.header}>
            <div className={style.headerContainer}>
                <Link to="/" className={style.logo}>
                    <img src="/Header/phone.svg" alt="logo" />
                    <span className={style.logoText}>Кибер сад</span>
                </Link>

                <div className={style.searchBox}>
                    <img
                        src="/Header/search.svg"
                        alt="search"
                        className={style.searchIconImg}
                    />
                    <input
                        type="text"
                        placeholder="Search"
                        className={style.searchInput}
                    />
                </div>

                <nav className={style.nav}>
                    <Link to="/" className={style.navLink}>
                        Home
                    </Link>
                    <Link to="/about" className={style.navLink}>
                        About
                    </Link>
                    <Link to="/contact" className={style.navLink}>
                        Contact Us
                    </Link>
                    <Link to="/blog" className={style.navLink}>
                        Blog
                    </Link>
                </nav>

                <div className={style.actions}>
                    <Link to="/wishlist" className={style.iconLink}>
                        <img src="/Header/heart-love-like.svg" alt="heart" />
                    </Link>
                    <Link to="/cart" className={style.iconLink}>
                        <img src="/Header/cart.svg" alt="cart" />
                    </Link>
                    <Link to="/auth" className={style.iconLink}>
                        <img src="/Header/person.svg" alt="person" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
