import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto mt-40">
        <h1 className="text-3xl font-medium text-center">Reset Password</h1>

        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            placeholder="you@example.com"
            required
            className="border-black"
          />
          <SubmitButton
            formAction={forgotPasswordAction}
            pendingText="Resetting..."
          >
            Reset Password
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <Link
            className="text-primary font-medium text-black-500"
            href="/sign-in"
          >
            Sign in
          </Link>
        </p>
      </form>
      <Image
        src="/sidebar.svg"
        alt="Sidebar"
        height={200}
        width={200}
        className="absolute md:w-1/5 right-0 top-0 z-20 max-md:-right-20 overflow-x-hidden max-md:top-8 max-md:h-80 max-md:-z-10"
      />
    </>
  );
}
