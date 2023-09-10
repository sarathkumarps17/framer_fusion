
import { NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import { headers } from 'next/headers'
import { userAuthHeaderKey } from "@/lib/constants";
import { UserAuthHeader } from "@/types/user";


export async function GET(req: NextRequest, res: NextApiResponse) {
    const user = headers().get(userAuthHeaderKey)
    const { id, email } = JSON.parse(user!) as UserAuthHeader
    return NextResponse.json({ message: 'protected profile api', id, email })

}