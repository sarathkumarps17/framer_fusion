import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Session } from "next-auth"
import { UserSessionSchema } from "@/types/user"

interface UseSessionOptions {
    /** If set to `true`, the returned session is guaranteed to not be `null` */
    required?: boolean
    /** If `required: true`, the user will be redirected to this URL, if they don't have a session */
    redirectTo?: string
    /** Configuration for `useQuery` */
    queryConfig?: UseQueryOptions<Session | null>

}

export async function fetchSession(): Promise<Session | null> {
    const res = await fetch("/api/auth/session")
    const session = await res.json()
    if (Object.keys(session).length) {
        console.log({ session })
        return session
    }
    return null
}
const useNextAuthQuerySession = ({
    required = false,
    redirectTo = "/api/auth/signin?error=SessionExpired",
    queryConfig = {},
}: UseSessionOptions) => {
    const router = useRouter()
    const query = useQuery<Session | null>(["session"], {
        queryFn: fetchSession,
        ...queryConfig,
        onSettled(data, error) {
            if (!required || data) return
            router.push(redirectTo)
        },
    })
    const user = UserSessionSchema.safeParse(query.data?.user);
    const isAuthenticated = user.success;
    return { user, isAuthenticated, query }
}
export default useNextAuthQuerySession