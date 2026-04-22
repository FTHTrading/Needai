import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const host = req.headers.get('host') ?? '';
  const { pathname } = req.nextUrl;

  // hail.unykorn.org → rewrite / to /hail
  if (host.startsWith('hail.')) {
    if (pathname === '/') {
      const url = req.nextUrl.clone();
      url.pathname = '/hail';
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // storm.unykorn.org → rewrite / to /storm-home
  if (host.startsWith('storm.')) {
    if (pathname === '/') {
      const url = req.nextUrl.clone();
      url.pathname = '/storm-home';
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
