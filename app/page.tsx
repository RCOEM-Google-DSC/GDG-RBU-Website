// app/page.tsx - Server component
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import HomeClientComponent from "@/components/home-client";

export default async function Page() {
  // Server-side checks
  if (!hasEnvVars) {
    return (
      <div className="flex flex-col gap-16 items-center">
        <h1 className="text-3xl text-center">Environment variables missing</h1>
        <p className="text-center ">
          Please make sure to add the required environment variables to your
          project.
        </p>
      </div>
    );
  }

  return (
    <HomeClientComponent
      headerAuthComponent={!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
    />
  );
}
