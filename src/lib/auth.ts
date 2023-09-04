
import { Auth } from "@/types/user"
import { QueryCache } from "@tanstack/query-core"
import { getToken } from "next-auth/jwt"
import { signOut } from "next-auth/react"
import { NextRequest } from "next/server"
const secret = process.env.JWT_SECRET!


export const authenticate = async (req: NextRequest) => {
    const token = await getToken({ req, secret })
    if (!token) return { isAuthenticated: false, user: null } as Auth
    return { isAuthenticated: true, user: { id: token.id ? token.id : null, email: token.email ? token.email : null } } as Auth
}

export const logOut = () => {
    const queryCache = new QueryCache()
    queryCache.clear()
    signOut()
}