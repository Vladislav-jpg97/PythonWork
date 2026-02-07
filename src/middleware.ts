import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./configs/i18n.config";
import { NextResponse, type NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: "as-needed",
    localeDetection: false,
})

export default async function middleware(request: NextRequest) {
    const response = intlMiddleware(request) ?? NextResponse.next();

    return response;
}

export const config = {
    matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"]
}