import { NextApiRequest } from "next";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { userAuthHeaderKey } from '@/lib/constants'
import { UserAuthHeader } from "@/types/user";

export async function GET(req: NextApiRequest) {
    const user = headers().get(userAuthHeaderKey)
    const { id, email } = JSON.parse(user!) as UserAuthHeader
    return NextResponse.json({ message: 'protected profile api', id, email })

}