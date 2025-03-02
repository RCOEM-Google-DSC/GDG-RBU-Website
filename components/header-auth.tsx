import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function HeaderAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Early return if env vars are missing
  if (!hasEnvVars) {
    return (
      <div className="flex gap-4 items-center p-4 border border-dashed border-red-500/30 rounded-lg bg-red-500/10">
        <Badge
          variant="destructive"
          className="font-normal"
        >
          Please update .env.local file with anon key and URL
        </Badge>
        <div className="flex gap-2">
          <Button
            asChild
            size="sm"
            variant="outline"
            disabled
            className="opacity-50"
          >
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="default"
            disabled
            className="opacity-50"
          >
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    );
  }

  return user ? (
    <div className="flex items-center gap-4">
      <form action={signOutAction}>
        <Button
          type="submit"
          variant="ghost"
          className="hover:bg-red-500/10 hover:text-red-500"
        >
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button
        asChild
        size="sm"
        variant="outline"
        className="hover:bg-gray-100"
      >
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button
        asChild
        size="sm"
        variant="default"
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
