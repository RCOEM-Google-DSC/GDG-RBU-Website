import { hasEnvVars } from "@/utils/supabase/check-env-vars";

import Home from "@/components/home/home";
import About from "../components/about/about";
import TwoColumnLayout from "@/components/feature/feature";
import FAQSection from "@/components/faq/faq";


export default async function Page() {
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

  return (<>
        <Home/>
        <About/>
        <TwoColumnLayout/>
        <FAQSection/>
  </>
  );
}
