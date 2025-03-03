import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

const RESTRICTED_PATHS = [
  "/protected",
  "/profile",
  "/admin/members",
  "/admin/user",
  "/add-on/blog",
  "/edit/event",
  "/edit/blog",
  "/add-on/event",
];

const ROLE_RESTRICTIONS: Record<string, string[]> = {
  admin: ["/admin/members", "/admin/user", "/add-on/blog", "/edit/event", "/edit/blog", "/add-on/event"],
  team: ["/admin/user", "/add-on/blog", "/edit/event", "/edit/blog", "/add-on/event"],
};

const handleRedirect = (url: string, request: NextRequest) => {
  return NextResponse.redirect(new URL(url, request.url));
};

const fetchUserRole = async (supabase: any, userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (error || !data) {
    return null;
  }

  return data.role;
};

export const updateSession = async (request: NextRequest) => {
  try {
    const response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const user = await supabase.auth.getUser();
    let userRole = null;

    if (user.data && user.data.user) {
      userRole = await fetchUserRole(supabase, user.data.user.id);
    }

    const pathname = request.nextUrl.pathname;

    if (RESTRICTED_PATHS.some(path => pathname.startsWith(path)) && user.error) {
      return handleRedirect("/sign-in", request);
    }

    if (pathname.startsWith("/admin/members") && userRole !== "admin") {
      return handleRedirect("/protected", request);
    }

    for (const role in ROLE_RESTRICTIONS) {
      if (ROLE_RESTRICTIONS[role].some(path => pathname.startsWith(path)) && userRole !== role) {
        return handleRedirect("/protected", request);
      }
    }

    if (
      (pathname === "/sign-in" || pathname === "/sign-up") &&
      !user.error
    ) {
      return handleRedirect("/protected", request);
    }

    if (pathname === "/" && !user.error) {
      return handleRedirect("/protected", request);
    }

    return response;
  } catch (e) {
    console.error("Error in updateSession middleware", e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
