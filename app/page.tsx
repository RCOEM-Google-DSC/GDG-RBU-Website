import { hasEnvVars } from "@/utils/supabase/check-env-vars";
export default async function Home() {
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
    <div className="flex flex-col gap-16 items-center">
      Welcome to the GDG Website .
      <br />
      Its Home page of the website.
    </div>
  );
}
