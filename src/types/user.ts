import { pswRe } from '@/helpers/validateCredentials';
import z from 'zod'


export const UserSessionSchema = z.object({
    name: z.string(),
    email: z.string(),
    image: z.string().optional()
})
export type UserSession = z.infer<typeof UserSessionSchema>;

export const SignUpSchema = z.object({
    name: z.string().max(20, { message: "Name should be not more than 20 character long" }).min(3, { message: "Name should be at least 2 character long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().regex(pswRe, {
        message: "Your password doest not follow the password policy",
    }).max(20, {
        message: "Your password doest not follow the password policy",
    }),
    passwordVerify: z.string().max(20)
})

export type SignUpData = z.infer<typeof SignUpSchema>

export const SignUpResponseSchema = z.object({
    status: z.number(),
    ok: z.boolean(),
    error: z.string().nullable().optional()
})

export type SignUpResponse = z.infer<typeof SignUpResponseSchema>

export type UserAuthHeader = { id: string | null, email: string | null }

export interface Auth {
    isAuthenticated: boolean,
    user: UserAuthHeader | null
}