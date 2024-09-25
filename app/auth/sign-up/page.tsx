import { Metadata } from "next";
import { SignUpForm } from "./_components/sign-up-form"

export const metadata: Metadata = {
  title: "Auth | Sign Up",
  description: "AGHS 120 | Reunion",
};

const SignUp = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SignUpForm />
    </div>
  )
}

export default SignUp
