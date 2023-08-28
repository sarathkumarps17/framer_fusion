
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { headers } from 'next/headers'
import { userAuthHeaderKey } from "@/lib/constants";
import { UserAuthHeader } from "@/types/user";


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const user = headers().get(userAuthHeaderKey)
    const { id, email } = JSON.parse(user!) as UserAuthHeader
    return NextResponse.json({ message: 'protected profile api', id, email })

}