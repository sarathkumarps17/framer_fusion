import { sessionQueryKey } from '@/lib/constants'
import { useQueryClient, QueryStatus } from '@tanstack/react-query'
import { Session } from 'next-auth'


type AuthSession = {
    isAuthenticated: boolean,
    session?: Session | null,
    SessionStatus?: QueryStatus
}
const useQuerySession = (): AuthSession => {
    const queryClient = useQueryClient();
    const session = queryClient.getQueryState<Session | null>([sessionQueryKey])
    if (!session?.data) return { isAuthenticated: false }
    return { isAuthenticated: true, session: session.data, SessionStatus: session.status }

}
export default useQuerySession