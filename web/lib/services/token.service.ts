import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * TokenService
 *
 * Provides helpers for reading/setting/clearing the auth token both on the
 * client (document.cookie + localStorage) and on the server (NextResponse
 * cookies). The middleware reads the `authToken` cookie, so that is the
 * canonical cookie name used here.
 */
class TokenService {
    private static cookieName = 'authToken'

    // --- Client-side helpers ---
    static setClientToken(token: string, rememberMe: boolean = false): void {
        if (typeof document === 'undefined') return
        try {
            const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60 // seconds
            const secure = location.protocol === 'https:'
            // Set cookie for middleware and server-side reads
            document.cookie = `${TokenService.cookieName}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; secure=${secure}; samesite=strict`
        } catch (error) {
            // Log but don't throw - cookie operations should be best-effort
            // eslint-disable-next-line no-console
            console.error('TokenService.setClientToken error', error)
        }
    }

    static getClientToken(): string | null {
        if (typeof document === 'undefined') return null
        try {
            const name = `${TokenService.cookieName}=`
            const parts = document.cookie.split('; ').find((p) => p.startsWith(name))
            if (!parts) return null
            return decodeURIComponent(parts.split('=')[1])
        } catch (error) {
            return null
        }
    }

    static clearClientToken(): void {
        if (typeof document === 'undefined') return
        try {
            // Expire cookie
            document.cookie = `${TokenService.cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
            try {
                // Do not remove token from localStorage because token is no longer stored there.
                // Still remove user entry if present.
                localStorage.removeItem('user')
            } catch (e) {
                // ignore
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('TokenService.clearClientToken error', error)
        }
    }

    // --- Server-side helpers (Next.js) ---
    static setServerToken(res: NextResponse, token: string, rememberMe: boolean = false): void {
        const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60
        try {
            res.cookies.set({
                name: TokenService.cookieName,
                value: token,
                maxAge,
                httpOnly: true,
                path: '/',
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
            })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('TokenService.setServerToken error', error)
        }
    }

    static clearServerToken(res: NextResponse): void {
        try {
            // Setting maxAge: 0 causes the cookie to be removed
            res.cookies.set({
                name: TokenService.cookieName,
                value: '',
                maxAge: 0,
                path: '/',
            })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('TokenService.clearServerToken error', error)
        }
    }

    static getTokenFromRequest(req: NextRequest): string | null {
        try {
            return req.cookies.get(TokenService.cookieName)?.value ?? null
        } catch (error) {
            return null
        }
    }
}

export default TokenService
