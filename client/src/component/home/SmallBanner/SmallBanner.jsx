import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

const SmallBanner = () => {
    const navigate = useNavigate();

    const banners = [
        {
            id: 1,
            title: "Playstation 5",
            description:
                "Невероятно мощные CPU, GPU и SSD с интегрированным I/O переопределят ваш игровой опыт.",
            image: "/SmallBanner/ps5.png",
            category: "igrovye-konsoli",
            theme: "light",
        },
        {
            id: 2,
            title: "Macbook Air",
            description:
                "Новый 15-дюймовый MacBook Air предоставляет больше пространства для ваших задач благодаря дисплею Liquid Retina.",
            image: "/SmallBanner/macbookair.png",
            category: "noutbuki",
            theme: "light",
        },
    ];

    const smallBanners = [
        {
            id: 3,
            title: "Apple AirPods Max",
            description: "Вычислительный звук. Послушайте, как это мощно.",
            image: "/SmallBanner/airpodsmax.png",
            category: "naushniki",
            theme: "dark",
        },
        {
            id: 4,
            title: "Apple Vision Pro",
            description: "Иммерсивный способ испытать развлечения.",
            image: "/SmallBanner/visionpro.png",
            category: "smartfony",
            theme: "dark",
        },
    ];

    const handleShopNow = (category) => {
        navigate(`/catalog?category=${category}`);
    };

    return (
        <div className={style.bannersWrapper}>
            <div className={style.topBanners}>
                {banners.map((banner) => (
                    <div
                        key={banner.id}
                        className={`${style.topBanner} ${style[banner.theme]}`}
                    >
                        <div className={style.topBannerInner}>
                            <div className={style.bannerImage}>
                                <img src={banner.image} alt={banner.title} />
                            </div>
                            <div className={style.bannerText}>
                                <h3 className={style.bannerTitle}>
                                    {banner.title}
                                </h3>
                                <p className={style.bannerDesc}>
                                    {banner.description}
                                </p>
                                <button
                                    className={style.bannerBtn}
                                    onClick={() =>
                                        handleShopNow(banner.category)
                                    }
                                >
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={style.bottomBanners}>
                {smallBanners.map((banner) => (
                    <div
                        key={banner.id}
                        className={`${style.bottomBanner} ${style[banner.theme]}`}
                    >
                        <div className={style.bottomBannerInner}>
                            <div className={style.bottomImage}>
                                <img src={banner.image} alt={banner.title} />
                            </div>
                            <div className={style.bottomText}>
                                <h3 className={style.bottomTitle}>
                                    {banner.title}
                                </h3>
                                <p className={style.bottomDesc}>
                                    {banner.description}
                                </p>
                                <button
                                    className={style.bottomBtn}
                                    onClick={() =>
                                        handleShopNow(banner.category)
                                    }
                                >
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SmallBanner;
