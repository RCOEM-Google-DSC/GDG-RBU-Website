import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
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
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const user = await supabase.auth.getUser();
    // Get user role from users table if user exists
    let userRole = null;
    if (!user.error) {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.data.user.id)
        .single();

      if (!userError && userData) {
        userRole = userData.role;
      }
    }
    // protected routes
    if (request.nextUrl.pathname.startsWith("/protected") && user.error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    // profile routes
    if (request.nextUrl.pathname.startsWith("/profile") && user.error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    // admin routes -- Members Management
    if (
      request.nextUrl.pathname.startsWith("/admin/members") &&
      userRole !== "admin"
    ) {
      return NextResponse.redirect(new URL("/protected", request.url));
    }
    // admin & team routes -- User Management
    if (
      request.nextUrl.pathname.startsWith("/admin/user") &&
      userRole !== "admin" &&
      userRole !== "team"
    ) {
      console.log("User is not an admin");
      return NextResponse.redirect(new URL("/protected", request.url));
    }
    if (
      request.nextUrl.pathname.startsWith("/add-on/blog") &&
      userRole !== "admin" &&
      userRole !== "team"
    ) {
      console.log("User is not an admin | team member");
      return NextResponse.redirect(new URL("/protected", request.url));
    }
    if (
      request.nextUrl.pathname.startsWith("/edit/event") &&
      userRole !== "admin" &&
      userRole !== "team"
    ) {
      console.log("User is not an admin | team member");
      return NextResponse.redirect(new URL("/protected", request.url));
    }
    if (
      request.nextUrl.pathname.startsWith("/edit/blog") &&
      userRole !== "admin" &&
      userRole !== "team"
    ) {
      console.log("User is not an admin | team member");
      return NextResponse.redirect(new URL("/protected", request.url));
    }
    if (
      request.nextUrl.pathname.startsWith("/add-on/event") &&
      userRole !== "admin" &&
      userRole !== "team"
    ) {
      console.log("User is not an admin | team member");
      return NextResponse.redirect(new URL("/protected", request.url));
    }

    // New check for sign-in and sign-up pages
    if (
      (request.nextUrl.pathname === "/sign-in" ||
        request.nextUrl.pathname === "/sign-up") &&
      !user.error
    ) {
      return NextResponse.redirect(new URL("/protected", request.url));
    }

    if (request.nextUrl.pathname === "/" && !user.error) {
      return NextResponse.redirect(new URL("/protected", request.url));
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
