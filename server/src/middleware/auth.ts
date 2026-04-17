import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "../utils/auth";

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
};

export const isAdmin = (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};
