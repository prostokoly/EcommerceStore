import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { AuthRequest } from "../middleware/auth";

export const AuthController = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password, firstName, lastName } = req.body;

            if (!email || !password) {
                return res
                    .status(400)
                    .json({ message: "Email and password are required" });
            }

            const result = await AuthService.register(
                email,
                password,
                firstName,
                lastName,
            );

            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res
                    .status(400)
                    .json({ message: "Email and password are required" });
            }

            const result = await AuthService.login(email, password);

            res.json({
                success: true,
                message: "Login successful",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },

    getMe: async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if (!req.user?.userId) {
                return res.status(401).json({ message: "Not authorized" });
            }

            const result = await AuthService.getMe(req.user.userId);

            res.json({
                success: true,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },
};
