import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto mt-40">
        <h1 className="text-3xl font-medium text-center">Reset Password</h1>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Please enter your new password below.
        </p>

        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="password">New Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="New password"
            required
            className="border-black"
          />
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            required
            className="border-black"
          />
          <SubmitButton
            formAction={resetPasswordAction}
            pendingText="Resetting..."
          >
            Reset Password
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
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
