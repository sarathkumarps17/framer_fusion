import { SignUpData, SignUpSchema } from "@/types/user"
import { ZodError } from "zod"


export const validateSignUpRequest = (signUpData: any): SignUpData | ZodError => {
    const result = SignUpSchema.safeParse(signUpData)
    if (result.success) return result.data
    return result.error
}