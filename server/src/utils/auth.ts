import jwt, { SignOptions } from "jsonwebtoken";
import { ENV } from "../config/env";

export interface JwtPayload {
    userId: number;
    email: string;
    role: string;
}

export const generateToken = (
    userId: number,
    email: string,
    role: string,
): string => {
    const options: SignOptions = {
        expiresIn: ENV.JWT_EXPIRES_IN as SignOptions["expiresIn"],
    };

    return jwt.sign({ userId, email, role }, ENV.JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload | null => {
    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET);

        if (typeof decoded === "object" && "userId" in decoded) {
            return {
                userId: decoded.userId as number,
                email: decoded.email as string,
                role: (decoded.role as string) || "user",
            };
        }
        return null;
    } catch {
        return null;
    }
};
