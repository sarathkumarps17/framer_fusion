import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json({ message: 'protected orders api' })
}