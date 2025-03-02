// SERVER SIDE RENDERED

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import HomeClientComponent from "@/components/home-client";

export default async function ProtectedPage() {
  // Create Supabase client
  const supabase = await createClient();

  // Fetch user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect if not authenticated
  if (!user) {
    return redirect("/sign-in");
  }

  // Check for environment variables
  if (!hasEnvVars) {
    return (
      <div className="flex flex-col gap-16 items-center">
        <h1 className="text-3xl text-center">Environment variables missing</h1>
        <p className="text-center">
          Please make sure to add the required environment variables to your
          project.
        </p>
      </div>
    );
  }

  return (
    <div>
      <HomeClientComponent
        headerAuthComponent={!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
      />
    </div>
  );
}
