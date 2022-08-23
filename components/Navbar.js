import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai"
import { MdHome } from "react-icons/md"
import { FaPlus, FaSearch } from "react-icons/fa"
import { GoMention } from "react-icons/go"
import Link from "next/link";
import { UserAuth } from "../authContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar = () => {
  let { user, logOut } = UserAuth()
  let router = useRouter()

  let log = () => {
    logOut()
  }

  const [top, setTop] = useState(true)

  useEffect(() => {
    const onScroll = e => {
      const { pageYOffset } = window;
      if (pageYOffset < 0.1) {
        setTop(true)
      } else {
        setTop(false)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
  }, [])

  return (
    <>
    {router.pathname !== "/login" && router.pathname !== "/sign-up" ? 
      <div className={"w-full h-[72px] font-sans sticky top-0 ease-in-out duration-300 z-40 " + (top ? "bg-transparent" : "bg-[#0e0b14] nav-shadow")}>
        <div className="flex items-center justify-between m-auto pt-3 px-4 text-[#f9f9f9]">
          <div className="flex pl-4">
            <Link href="/">
              <Image className="cursor-pointer p-4" src="/logo.svg" alt="logo" width="79" height="48"></Image>
            </Link>

            <ul className="flex items-center justify-between uppercase whitespace-nowrap pt-2">
              <Link href="/">
                <a className="nav-item ml-8 md:ml-14 ">
                  <MdHome size={18} className="md:mr-4" /> <p className="hidden md:block">Home</p>
                </a>
              </Link>
              
              <Link href="/search">
                <a className="nav-item">
                  <FaSearch size={16} className="md:mr-4" /> <p className="hidden md:block">Search</p>
                </a>
              </Link>
              <Link href="/watchlist">
                <a className="nav-item">
                  <FaPlus size={16} className="md:mr-4" /> <p className="hidden md:block">Watchlist</p>
                </a>
              </Link>
              <Link href="/credit">
                <a className="nav-item">
                  <GoMention size={16} className="md:mr-4" /> <p className="hidden md:block">Credit</p>
                </a>
              </Link>
            </ul>
          </div>

          <div className="flex pl-4">
            <ul className="flex ml-auto">
              {(!user || user?.isAnonymous) ?
              <>
                <li className="nav-item">
                  <Link href="/login">Log In</Link>
                </li>
                <li className="nav-item">
                  <Link href="/sign-up">Sign Up</Link>
                </li>
              </>
              :
              <div className="nav-item group">
                Account
                <div className="hidden px-4 py-8 absolute top-0 right-0 w-[250px] h-fit rounded-md bg-[#131313] border-[1px] border-[#323232] group-hover:flex flex-col ease-in-out duration-500">
                  <ul>
                    <li className="text-2xl mb-4 h-full">Account</li>
                    <li className="py-4 text-slate-300 text-md flex items-center hover:text-white">
                      <span className="w-fit mr-2 p-2 bg-[#262626] rounded-full">
                        <AiOutlinePlus size={30} />
                      </span>
                      Add profile
                    </li>
                    <li className="py-4 text-md py-auto hover:text-white text-slate-300">Edit profile</li>
                    <li className="py-4 text-md hover:text-white text-slate-300">App settings</li>
                    <li className="py-4 text-md hover:text-white text-slate-300">Account</li>
                    <li className="py-4 text-md hover:text-white text-slate-300">Help</li>
                    <li className="py-4 text-md hover:text-white text-slate-300" onClick={log}>Log out</li>
                  </ul>
                </div>
              </div>
              }
            </ul>
          </div>
        </div>
      </div>
    :
    null
    }
    </>
  );
}
 
export default Navbar;