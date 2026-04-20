import React from "react";
import style from "./style.module.css";

const Banner = () => {
    const data = {
        title: "Iphone 17",
        image: "/Banner/Iphone1.png",
    };
    return (
        <div>
            <div className={style.bigBanner}>
                <div>
                    <h1 className={style.title}>
                        Добро пожаловать в Кибер Сад.
                    </h1>
                    <p className={style.subTitle}>
                        Откройте для себя удивительные продукты по отличным
                        ценам.
                    </p>
                </div>
                <div className={style.info}>
                    <h2 className={style.subTitle}>{data.title}</h2>
                    <img src={data.image} alt="" className={style.img} />
                </div>
            </div>
        </div>
    );
};

export default Banner;
