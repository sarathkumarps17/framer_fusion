import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Session } from "next-auth"
import { UserSessionSchema } from "@/types/user"
import { sessionExpiry, sessionQueryKey } from "@/lib/constants"

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
    const query = useQuery<Session | null>([sessionQueryKey], fetchSession, {
        staleTime: sessionExpiry,
        ...queryConfig,
        onSettled(data, error) {
            if (!required || data) return
            router.push(redirectTo)
        },
    })
    const parsedUser = UserSessionSchema.safeParse(query.data?.user);
    const isAuthenticated = parsedUser.success;
    const user = isAuthenticated ? parsedUser.data : null
    const status = query.status
    return { user, isAuthenticated, status, query }
}
export default useNextAuthQuerySession