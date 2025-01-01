import { NextRequest, NextResponse } from "next/server";


export function middleware(req:NextRequest) {

    const token = req.cookies.get("auth_token")?.value;

    if(req.nextUrl.pathname.startsWith('/dashboard')) {

        if(!token) {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }

    if(req.nextUrl.pathname.startsWith('/login')) {

        if(token) {
            return NextResponse.redirect(new URL('/dashboard/home', req.url))
        }
    }
    if(req.nextUrl.pathname.startsWith('/signup')) {

        if(token) {
            return NextResponse.redirect(new URL('/dashboard/home', req.url))
        }
    }

    return NextResponse.next();
}