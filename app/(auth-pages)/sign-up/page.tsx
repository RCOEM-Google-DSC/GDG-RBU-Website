import { signInWithGoogleAction, signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4 ">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto mt-32">
        <h1 className="text-3xl font-medium text-center">Sign up</h1>

        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            name="fullName"
            placeholder="Full Name"
            required
            className="border-black"
          />
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            placeholder="you@example.com"
            required
            className="border-black"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
            className="border-black"
          />
          <SubmitButton
            formAction={signUpAction}
            pendingText="Signing up..."
          >
            Sign up
          </SubmitButton>
          <button
            type="button"
            onClick={signInWithGoogleAction}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Continue with Google
          </button>
          <FormMessage message={searchParams} />
        </div>
        <p className="text-sm text text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <Link
            className="text-primary font-medium text-black-500 "
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
