import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {

    return NextResponse.json({ message: 'protected orders api' })

}