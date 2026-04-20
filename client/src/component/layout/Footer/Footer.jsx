import React from "react";
import style from "./style.module.css";

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.footerContainer}>
                <div className={style.footerInfo}>
                    <h3 className={style.footerTitle}>Кибер сад</h3>
                    <p className={style.footerText}>Интернет-магазин техники</p>

                    <div className={style.contactBlock}>
                        <p className={style.contactLabel}>Разработчик:</p>
                        <p className={style.contactValue}>Николай Соснов</p>
                    </div>
                    <div className={style.contactBlock}>
                        <p className={style.contactLabel}>Телефон:</p>
                        <a
                            href="tel:+79999999999"
                            className={style.contactLink}
                        >
                            +7 (999) 999-99-99
                        </a>
                    </div>
                </div>
                <div className={style.footerSocial}>
                    <a
                        href="https://github.com/prostokoly"
                        className={style.iconLink}
                    >
                        <img src="/Footer/github.svg" alt="GitHub" />
                    </a>

                    <a
                        href="https://vk.com/prostokoly"
                        className={style.iconLink}
                    >
                        <img src="/Footer/vk.svg" alt="vk" />
                    </a>
                </div>
            </div>
            <div className={style.footerBottom}>
                <p>&copy; {new Date().getFullYear()} Кибер сад.</p>
            </div>
        </footer>
    );
};

export default Footer;
