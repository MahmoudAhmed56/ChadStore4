import { SignedIn } from "@clerk/nextjs"

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <SignedIn />
    </div>
  )
}

export default SignInPage