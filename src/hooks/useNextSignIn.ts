import { loginFormSchema } from '@/components/auth/LoginForm'
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import * as z from "zod"
import { signIn } from "next-auth/react";
import { SignInResponse } from 'next-auth/react'
import { fetchSession } from './useNextAuthQuerySession';
import { sessionExpiry, sessionQueryKey } from '@/lib/constants';




type UserData = z.infer<typeof loginFormSchema>
interface UseSessionOptions {
    redirectTo?: string
}

export async function login(userData: UserData): Promise<SignInResponse | undefined> {
    return signIn('credentials', { ...userData, redirect: false })
}
const useNextSingIn = ({
    redirectTo,
}: UseSessionOptions) => {
    const query = useQuery([sessionQueryKey], fetchSession, {
        staleTime: sessionExpiry,
        enabled: false
    })
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: (variables: UserData) => login(variables),
        onSettled(data, error) {
            if (!redirectTo) return
            if (data && data.ok && (data.error === 'SessionExpired' || !data.error)) {
                query.refetch()
                router.push(redirectTo)
            }
        }
    })
    const isSuccess = mutation.data?.ok && !mutation.data?.error
    const error = mutation.data?.error;
    return { isSuccess, error, mutation }
}
export default useNextSingIn