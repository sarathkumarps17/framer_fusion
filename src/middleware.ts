import { NextRequest, NextResponse } from 'next/server'
import { authenticate } from '@/lib/auth'
import { userAuthHeaderKey } from './lib/constants'

// Limit the middleware to paths starting with `/api/profile`
export const config = {
    matcher: '/api/profile/:path*',
}

export async function middleware(request: NextRequest) {
    // Call our authentication function to check the request
    const { isAuthenticated, user } = await authenticate(request)
    if (!isAuthenticated || !user) {
        // Respond with JSON indicating an error message
        return new NextResponse(
            JSON.stringify({ success: false, message: 'authentication failed' }),
            { status: 401, headers: { 'content-type': 'application/json' } }
        )
    }

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set(userAuthHeaderKey, JSON.stringify(user))
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })
    return response

}