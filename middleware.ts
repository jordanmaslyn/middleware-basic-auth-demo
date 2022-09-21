import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  const url = req.nextUrl;

  if (!process.env.SITE_USERNAME || !process.env.SITE_PASSWORD) {
    // Basic Auth not enabled in this environment
    NextResponse.next();
    return;
  }

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (
      user === process.env.SITE_USERNAME &&
      pwd === process.env.SITE_PASSWORD
    ) {
      return NextResponse.next();
    }
  }

  url.pathname = "/api/auth";
  return NextResponse.rewrite(url);
}
