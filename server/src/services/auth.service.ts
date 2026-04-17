import { db } from "../config/database";
import { users } from "../db/schema/users";
import { eq } from "drizzle-orm";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/auth";
import { AppError } from "../utils/AppError";

export const AuthService = {
    async register(
        email: string,
        password: string,
        firstName?: string,
        lastName?: string,
    ) {
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (existingUser) {
            throw new AppError("User with this email already exists", 400);
        }

        const hashedPassword = await hashPassword(password);

        const [newUser] = await db
            .insert(users)
            .values({
                email,
                password: hashedPassword,
                firstName,
                lastName,
            })
            .returning({
                id: users.id,
                email: users.email,
                firstName: users.firstName,
                lastName: users.lastName,
                role: users.role,
            });

        const token = generateToken(
            newUser.id,
            newUser.email,
            newUser.role ?? "user",
        );

        return {
            user: {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role ?? "user",
            },
            token,
        };
    },

    async login(email: string, password: string) {
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            throw new AppError("Invalid email or password", 401);
        }

        const token = generateToken(user.id, user.email, user.role ?? "user");

        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role ?? "user",
            },
            token,
        };
    },

    async getMe(userId: number) {
        const user = await db.query.users.findFirst({
            where: eq(users.id, userId),
            columns: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw new AppError("User not found", 404);
        }

        return {
            user: {
                ...user,
                role: user.role ?? "user",
            },
        };
    },
};
