
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { SignUpData, SignUpResponse } from "@/types/user"
import axios, { AxiosRequestConfig } from 'axios'
import useAlert, { Variant } from "./useAlert"
interface UseSessionOptions {
    redirectTo?: string
}

export async function signUp(userData: SignUpData): Promise<SignUpResponse> {
    const data = JSON.stringify(userData)
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json'
        },
        transformResponse: [function (data) {
            return JSON.parse(data);
        }],
    }
    return axios.post<SignUpResponse>('/api/auth/signup', data, config).then(res => res.data)
}
const useSignUpQuery = ({
    redirectTo,
}: UseSessionOptions) => {
    const router = useRouter()
    const setAlert = useAlert({ description: 'Successfully Signed in', variant: Variant.success })
    const mutation = useMutation({
        mutationFn: (variables: SignUpData) => signUp(variables),
        onSettled(data, error) {
            if (!redirectTo) return
            if (data?.ok && !error) {
                router.push(redirectTo)
                setAlert()
            }

        }
    })
    const isSuccess = mutation.data?.ok
    const status = mutation.data?.status;
    const error = mutation.data?.error
    return { isSuccess, status, error, mutation }
}
export default useSignUpQuery