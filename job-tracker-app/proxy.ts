import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "./utils/supabase/server"

export async function proxy(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  if (!user && req.nextUrl.pathname.startsWith("/")) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/login"
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*"],
}