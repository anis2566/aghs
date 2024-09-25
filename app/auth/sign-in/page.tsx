import { Metadata } from "next";

import { SignInForm } from "./_components/sign-in-form"

export const metadata: Metadata = {
  title: "Auth | Sign In",
  description: "AGHS 120 | Reunion",
};

const SignIn = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SignInForm />
    </div>
  )
}

export default SignIn
