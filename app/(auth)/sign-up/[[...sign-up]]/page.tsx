import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
  return (
    <div className="mt-4 flex items-center justify-center h-screen w-full">
      <SignUp />
    </div>
  )
}

export default SignUpPage