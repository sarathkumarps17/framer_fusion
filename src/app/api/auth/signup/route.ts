import { validateSignUpRequest } from "@/helpers/apiRequestValidation"
import { prisma } from "@/lib/prisma"
import { SignUpData } from "@/types/user"
import { NextResponse } from "next/server"
import { ZodError } from "zod"
import bcrypt from 'bcrypt'


export async function POST(req: Request) {
    const data: SignUpData = await req.json()
    try {
        const validData = validateSignUpRequest(data)
        if (validData instanceof ZodError) throw validData
        const user = {
            name: validData.name,
            email: validData.email,
            password: await bcrypt.hash(validData.password, 10),
            avatar: '',
            isVerified: false
        }
        const res = await prisma.user.create({ data: user })
        if (res.id) return NextResponse.json({ ok: true, status: 200 })
    } catch (error) {
        console.log(error)
        if (error instanceof ZodError) return NextResponse.json({ ok: false, status: 400, error }, { status: 400 })
    }

}