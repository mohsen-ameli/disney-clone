import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai"
import { MdHome } from "react-icons/md"
import { FaPlus, FaSearch } from "react-icons/fa"
import { GoMention } from "react-icons/go"
import Link from "next/link";
import { UserAuth } from "../authContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBtn from "./navBtn";
import { AnimatePresence, motion } from "framer-motion";

const accountVariant = {
  hidden: {
    scaleY: 0,
    opacity: 0
  },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: .25 }
  }
}

const Navbar = () => {
  let { user, logOut } = UserAuth()
  let router = useRouter()
  const [open, setOpen] = useState(false)
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
    {router.pathname !== "/login" && router.pathname !== "/login/password" && router.pathname !== "/sign-up" ? 
      <>
      <div className={"hidden md:block pl-1 w-full h-[72px] font-sans sticky top-0 ease-in-out duration-300 z-40 " + (top ? "bg-transparent" : "bg-[#0e0b14] nav-shadow")}>
        <div className="flex items-center justify-between m-auto pt-3 px-4 text-[#f9f9f9]">
          <div className="flex pl-4">
            <Link href="/">
              <Image className="cursor-pointer p-4" src="/logo.svg" alt="logo" width="79" height="48"></Image>
            </Link>

            <ul className="flex items-center justify-between uppercase whitespace-nowrap pt-2 ml-6">
              <NavBtn text="Home" icon={<MdHome size={18} className="md:mr-3" />} href="/" />
              <NavBtn text="Search" icon={<FaSearch size={16} className="md:mr-3" />} href="/search" />
              <NavBtn text="Watchlist" icon={<FaPlus size={16} className="md:mr-3" />} href="/watchlist" />
              <NavBtn text="Credit" icon={<GoMention size={16} className="md:mr-3" />} href="/credit" />
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
              <motion.div className="nav-item group"
                onHoverStart={() => setOpen(true)}
                onHoverEnd={() => setOpen(false)}
              >
                Account
                <AnimatePresence mode="wait">
                  {open &&
                    <motion.div className="origin-top px-4 py-8 absolute top-0 right-0 w-[250px] h-fit rounded-md bg-[#131313] border-[1px] border-[#323232] group-hover:flex flex-col"
                    variants={accountVariant}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    >
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
                        <li className="py-4 text-md hover:text-white text-slate-300" onClick={() => logOut()}>Log out</li>
                      </ul>
                    </motion.div>
                  }
                </AnimatePresence>
              </motion.div>
              }
            </ul>
          </div>
        </div>
      </div>
      
      {/* mobile navbar */}
      <div className="md:hidden fixed bottom-0 w-full h-[70px] bg-[#0e0b14e1] z-40">
        <ul className="w-full h-full flex items-center justify-around">
          <Link href="/">
            <div className="p-5">
              <MdHome size={30} className="md:mr-3" />
            </div>
          </Link>
          <Link href="/search">
            <div className="p-6">
              <FaSearch size={25} className="md:mr-3" />
            </div>
          </Link>
          <Link href="/watchlist">
            <div className="p-5">
              <FaPlus size={30} className="md:mr-3" />
            </div>
          </Link>
        </ul>
      </div>
      </>
    :
    null
    }
    </>
  );
}
 
export default Navbar;