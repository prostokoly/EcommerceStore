import dotenv from "dotenv";

dotenv.config();

export const ENV: {
    PORT: string;
    DB_URL: string;
    NODE_ENV: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
} = {
    PORT: process.env.PORT || "3000",
    DB_URL: process.env.DB_URL || "",
    NODE_ENV: process.env.NODE_ENV || "development",
    JWT_SECRET: process.env.JWT_SECRET || "dev_secret_123",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
};
