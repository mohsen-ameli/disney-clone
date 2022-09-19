import { AuthContextProvider } from "../authContext";
import Footer from "./footer";
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <AuthContextProvider>
      <Navbar />
      <div className="md:pb-0 pb-14">
        {children}
      </div>
      <Footer />
    </AuthContextProvider>
  );
}
 
export default Layout;