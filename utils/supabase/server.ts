import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  try {
    const cookieStore = await cookies();

    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value;
          },
          set(name, value, options) {
            try {
              cookieStore.set(name, value, options);
            } catch (error) {}
          },
          remove(name, options) {
            try {
              cookieStore.set(name, "", { ...options, maxAge: 0 });
            } catch (error) {}
          },
        },
      }
    );
  } catch (error) {
    // Handle the case where cookies() is called outside request scope (isko change mat kro!)
    console.error("Error creating Supabase client:", error);
    // Fallback when cookies are unavailable
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) {
            return undefined;
          },
          set(name, value, options) {
          },
          remove(name, options) {
          },
        },
      }
    );
  }
};