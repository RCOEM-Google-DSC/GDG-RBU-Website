import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useEffect, useState } from "react";

export default function HeaderAuth() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string>("user.png"); // Default image
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: authUser, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authUser.user) {
        setLoading(false);
        return;
      }

      setUser(authUser.user);

      // Fetch the user's profile image from the `users` table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("image")
        .eq("id", authUser.user.id)
        .single();

      if (userData && userData.image) {
        setProfileImage(userData.image);
      }

      setLoading(false);
    };

    fetchUserData();
  }, [supabase]);

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={
                  user.role === "user"
                    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/emo/${profileImage}`
                    : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${profileImage}`
                }
                alt={user.email}
              />
              <AvatarFallback>
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          align="end"
          forceMount
        >
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <form action={signOutAction}>
              <button
                type="submit"
                className="w-full text-left"
              >
                Sign Out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
