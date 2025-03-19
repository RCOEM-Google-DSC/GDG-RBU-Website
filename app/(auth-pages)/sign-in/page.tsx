

import { signInAction, signInWithGoogleAction } from "@/app/actions"
import { FormMessage, type Message } from "@/components/form-message"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"

export default async function SignIn(props: {
  searchParams: Promise<Message>
}) {
  const searchParams = await props.searchParams
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    )
  }

  return (
   <> 
   <form className="flex flex-col border-black dark:border-white min-w-72 max-w-64 mx-auto pt-20 md:pt-40 relative z-10 px-4 md:px-0">
        <h1 className="text-3xl font-medium text-center">Sign in</h1>

        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8 ">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required className="border-black dark:border-white" />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
            className="border-black dark:border-white"
          />
          <SubmitButton formAction={signInAction} pendingText="Signing in...">
            Sign in
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
          Don't have an account?{" "}
          <Link className="text-primary font-medium text-black-500 " href="/sign-up">
            Sign up
          </Link>
        </p>
      </form>

     
      <Image
        src="/sidebar.svg"
        alt="Sidebar"
        height={200}
        width={200}
        className="absolute md:w-1/5 right-0 top-0 z-20 hidden md:block"
      />
      </>
      

     
   
  )
}






{/* <Image
        src="/sidebar.svg"
        alt="Sidebar"
        height={200}
        width={200}
        className="absolute md:w-1/5 right-0 top-0 z-20 max-md:-right-20 overflow-x-hidden max-md:top-8 max-md:h-80 max-md:-z-10"
      /> */}