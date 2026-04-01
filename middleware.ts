import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Protected routes that require authentication
    const protectedRoutes = ['/dashboard'];
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        // Check if user has valid session (auth cookie)
        const session = request.cookies.get('session')?.value;

        if (!session) {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            // Verify the session is valid (basic check)
            const sessionData = JSON.parse(session);
            if (!sessionData.email || !sessionData.authenticated) {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        } catch {
            // If session parsing fails, redirect to login
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
};
