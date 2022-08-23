import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { UserAuth } from "../authContext"

const Login = () => {
  let { user, logIn } = UserAuth()
  let router = useRouter()

  const [emailErr, setEmailErr] = useState("")
  const [passErr, setPassErr] = useState("")

  let submit = async e => {
    e.preventDefault()

    if (e.target.email.value && e.target.password.value) {
      try {
        await logIn(e.target.email.value, e.target.password.value)
        router.push("/")
      } catch (error) {
        if (error.message.includes("invalid-email")) {
          setEmailErr("We couldn't find an account for that email.")
        } else if (error.message.includes("wrong-password")) {
          setPassErr('Incorrect Password. Please reenter your password and try again. If the problem persists, try resetting your password by selecting "Forgot Password?"')
        } else if (error.message.includes("user-not-found")) {
          setEmailErr("User not found")
        } else {
          console.log("first", error.message)
        }
      }
    } else if (!e.target.email.value) {
      setEmailErr("Please enter your current email.")
    } else if (!e.target.password.value) {
      setPassErr("Please enter your current password.")
    }
  }

  useEffect(() => {
    user && user?.isAnonymous && router.push("/")
  })

  return (
    <div className="w-full h-screen py-8 bg-[#1a1d29]">
      <div className="max-w-[1400px] mx-auto flex flex-col">
        <Link href="/">
          <Image className="cursor-pointer p-4 justify-self-center" src="/logo.svg" alt="logo" width="172" height="104"></Image>
        </Link>
      
        <form className="flex flex-col items-center max-w-[60px] mx-auto caret-[#02e7f5]" onSubmit={e => submit(e)} method="POST">
          <div className="flex flex-col">
            <h1 className="text-2xl mb-6 mt-4">Log in with your email</h1>
            <input onChange={() => setEmailErr("")} className={(emailErr ? "border-[#FF554C] " : "focus:border-gray-300 border-transparent ") + "h-[54px] w-[363px] pl-4 outline-none bg-[#31343e] border-[1px] focus:ease-in-out duration-200 text-white rounded-md"} type="text" placeholder="Email" name="email" />
            <small className="mt-1 text-[#FF554C] font-normal">{emailErr}</small>
          </div>

          <div className="flex flex-col my-6">
            <input onChange={() => setPassErr("")} className={(passErr ? "border-[#FF554C] " : "focus:border-gray-300 border-transparent ") + "h-[54px] w-[363px] pl-4 outline-none bg-[#31343e] border-[1px] focus:ease-in-out duration-200 text-white rounded-md"} type="text" placeholder="Password" name="password" />
            <small className="mt-1 text-[#FF554C] font-normal">{passErr}</small>
            <small className="mt-2 text-gray-400">(case sensitive)</small>
          </div>
          <div className="flex flex-col">
            <button type="submit" className="h-[54px] w-[363px] bg-[#0072d2] uppercase font-bold rounded-md hover:bg-[#0083ef] hover:ease-in-out duration-300">Log in</button>
            <small className="flex text-slate-400 mt-8 text-[12pt]">New to Disney+? <Link href="/sign-up"><span className="ml-2 text-white cursor-pointer">Sign up</span></Link></small>
          </div>
        </form>
      </div>
    </div>
  );
}
 
export default Login;