import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ENV } from "./config/env";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to E-Commerce API",
        version: "1.0.0",
    });
});

app.use("/api/auth", authRoutes);

app.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on port ${ENV.PORT}`);
});
