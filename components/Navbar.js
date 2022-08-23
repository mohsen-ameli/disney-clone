import Image from "next/image";
import {AiFillStar} from "react-icons/ai"
import {MdHome} from "react-icons/md"
import {FaPlus, FaSearch} from "react-icons/fa"
import {RiMovie2Line} from "react-icons/ri"
import {TbRadio} from "react-icons/tb"
import {GoMention} from "react-icons/go"
import {BsList} from "react-icons/bs"
import Link from "next/link";
import { UserAuth } from "../authContext";
import { useRouter } from "next/router";

const Navbar = () => {
  let { user, logOut } = UserAuth()
  let router = useRouter()

  let logout = () => {
    logOut()
  }

  return (
    <>
    {router.pathname !== "/login" && router.pathname !== "/sign-up" ? 
      <div className="w-full h-[72px] bg-[#0e0b14] font-sans drop-shadow-2xl sticky top-0 z-20">
        <div className="flex items-center justify-between m-auto pt-3 px-4 text-[#f9f9f9]">
          <div className="flex pl-4">
            <Link href="/" >
              <Image className="cursor-pointer p-4" src="/logo.svg" alt="logo" width="79" height="48"></Image>
            </Link>

            <ul className="flex items-center justify-between uppercase whitespace-nowrap pt-2">
              <Link href="/" >
                <a className="nav-item ml-8 md:ml-14 ">
                  <MdHome size={18} className="md:mr-4" /> <p className="hidden md:block">Home</p>
                </a>
              </Link>
              
              <Link href="/search">
                <a className="nav-item">
                  <FaSearch size={16} className="md:mr-4" /> <p className="hidden md:block">Search</p>
                </a>
              </Link>
              <Link href="">
                <a className="nav-item">
                  <FaPlus size={16} className="md:mr-4" /> <p className="hidden md:block">Watchlist</p>
                </a>
              </Link>
              {/* <Link href="">
                <a className="nav-item">
                  <AiFillStar size={16} className="md:mr-4" /> <p className="hidden md:block">Originals</p>
                </a>
              </Link>
              <Link href="">
                <a className="nav-item">
                  <RiMovie2Line size={16} className="md:mr-4" /> <p className="hidden md:block">Movies</p>
                </a>
              </Link>
              <Link href="">
                <a className="nav-item">
                  <TbRadio size={16} className="md:mr-4" /> <p className="hidden md:block">Series</p>
                </a>
              </Link> */}
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
              <>
                <li className="nav-item">Account</li>
                <li className="nav-item" onClick={() => logout()}>Log out</li>
              </>
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