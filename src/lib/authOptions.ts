import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from 'bcrypt'
import { generateToken, verifyToken } from "@/helpers/jwt";
import GoogleProvider from "next-auth/providers/google";
import { sessionExpiry, tokenExpiry } from "./constants";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials.password) {
                    return null;
                }
                try {
                    const user = await prisma.user.findFirst({
                        where: { email: credentials?.email }, select: {
                            id: true,
                            name: true,
                            email: true,
                            avatar: true,
                            password: true,
                            token: true
                        },
                    })
                    if (!user) return null
                    const isMatch = await bcrypt.compare(credentials?.password!, user.password)

                    if (isMatch) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            image: user.avatar,
                            authToken: user.token && verifyToken(user.token) ? user.token : generateToken({ name: user.name, email: user.email }, 1 * 24 * 60 * 60)
                        }
                    }
                    return null
                } catch (error) {
                    console.log({ error })
                    throw new Error('Server Error')
                }

            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.email = profile?.email
                token.picture = profile?.image
            }
            if (user) {
                token.id = user.id,
                    token.email = user.email
                token.picture = user.image
            }
            return token
        },
    },
    pages: {
        signIn: '/auth/login',
    },
    session: {
        strategy: "jwt",
        maxAge: sessionExpiry
    },
    secret: process.env.JWT_SECRET,
    jwt: {
        secret: process.env.JWT_SECRET,
        maxAge: tokenExpiry
    }
}

