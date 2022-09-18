import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { UserAuth } from "../../authContext"

const Login = () => {
  const router = useRouter()
  const { user, logIn } = UserAuth()
  const [loading, setLoading] = useState(false)
  const [emailErr, setEmailErr] = useState("")

  const submit = async e => {
    e.preventDefault()

    if (e.target.email.value) {
      try {
        await logIn(e.target.email.value, ".")
        router.push({ pathname: "/login/password", query: {username: e.target.email.value} })
        setLoading(true)
      } catch (error) {
        if (error.message.includes("invalid-email")) {
          setEmailErr("We couldn't find an account for that email.")
        } else if (error.message.includes("user-not-found")) {
          setEmailErr("User not found")
        } else {
          router.push({ pathname: "/login/password", query: {username: e.target.email.value} })
          setLoading(true)
          console.log("Error occured")
        }
      }
    } else {
      setEmailErr("Please enter your current email.")
    }
  }

  useEffect(() => {
    user && user?.isAnonymous && router.push("/")
  })

  return (
    <>
      <Head>
        <title>Log In | Disney+</title>
      </Head>

      <div className="w-full h-screen py-8 bg-[#1a1d29]">
        <div className="max-w-[1400px] mx-auto flex flex-col">
          <Link href="/">
            <Image priority={true} className="cursor-pointer p-4 justify-self-center" src="/logo.svg" alt="logo" width="172" height="104"></Image>
          </Link>
        
          <form className="flex flex-col items-center max-w-[60px] mx-auto caret-[#02e7f5]" onSubmit={e => submit(e)} method="POST">
            <div className="flex flex-col my-6">
              <h1 className="text-2xl mb-6 mt-4">Log in with your email</h1>
              <input onChange={() => setEmailErr("")} className={(emailErr ? "border-[#FF554C] " : "focus:border-gray-300 border-transparent ") + "h-[54px] w-[363px] pl-4 outline-none bg-[#31343e] border-[1px] focus:ease-in-out duration-200 text-white rounded-md"} type="text" placeholder="Email" name="email" />
              <small className="mt-1 text-[#FF554C] font-normal">{emailErr}</small>
            </div>

            <div className="flex flex-col">
              <button type="submit" className={(loading ? "cursor-default bg-[#004781]" : "hover:bg-[#0083ef]") + " h-[54px] w-[363px] uppercase font-bold rounded-md bg-[#0072d2] hover:ease-in-out duration-300"}>
                {!loading ? "Continue" : <Image className="loader" width="30" height="30" src="/loader.png" alt="Loader"></Image>}
              </button>
              <small className="flex text-slate-400 mt-10 text-[11pt]">New to Disney+? <Link href="/sign-up"><span className="ml-2 text-white cursor-pointer">Sign up</span></Link></small>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
 
export default Login;