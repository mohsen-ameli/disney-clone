import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { UserAuth } from "../../authContext"

const Password = () => {
  const { user, logIn } = UserAuth()
  const router = useRouter()
  const { username } = router.query
  const [loading, setLoading] = useState(false)
  const [passErr, setPassErr] = useState("")

  const submit = async e => {
    e.preventDefault()

    if (e.target.password.value) {
      try {
        await logIn(username, e.target.password.value)
        router.push("/")
        setLoading(true)
      } catch (error) {
        if (error.message.includes("wrong-password")) {
          setPassErr('Incorrect Password. Please reenter your password and try again. If the problem persists, try resetting your password by selecting "Forgot Password?"')
        } else if (error.message.includes("too-many-requests")) {
          setPassErr('Access to your account has been temporarily disabled due to many failed login attempts.')
        } else {
          console.log("Error occured")
        }
      }
    } else {
      setPassErr("Please enter your current password.")
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
              <h1 className="text-2xl mb-6 mt-4">Enter your password</h1>
              <input onChange={() => setPassErr("")} className={(passErr ? "border-[#FF554C] " : "focus:border-gray-300 border-transparent ") + "h-[54px] w-[363px] pl-4 outline-none bg-[#31343e] border-[1px] focus:ease-in-out duration-200 text-white rounded-md"} type="text" placeholder="Password" name="password" />
              <small className="mt-1 text-[#FF554C] font-normal">{passErr}</small>
              <small className="mt-2 text-gray-400">(case sensitive)</small>
            </div>
            <div className="flex flex-col">
              <button type="submit" className={(loading ? "cursor-default bg-[#004781]" : "hover:bg-[#0083ef]") + " h-[54px] w-[363px] uppercase font-bold rounded-md bg-[#0072d2] hover:ease-in-out duration-300"}>
                {!loading ? "log in" : <Image className="loader" width="30" height="30" src="/loader.png" alt="Loader"></Image>}
              </button>
              <small className="text-[#66bcff] mt-8 text-[11pt] cursor-pointer hover:text-[#9dd4ff] hover:underline">Forgot password?</small>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
 
export default Password;